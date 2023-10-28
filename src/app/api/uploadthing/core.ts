import { cookies } from 'next/headers';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { verifyToken } from '@/server/trpc';
import db from '@/drizzle';
import { companies, users } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { createTokenForUser } from '@/server/service/auth/token';

const f = createUploadthing();

const auth = (req: Request) => {
  const rawToken = cookies().get('token')?.value;
  console.log(rawToken);
  if (!rawToken) return null;
  try {
    const token = verifyToken(rawToken, { ignoreExpiration: true });
    return token;
  } catch (_) {
    return null;
  }
};

const useMiddleware = async ({ req }: any) => {
  // This code runs on your server before upload
  const user = auth(req);

  // If you throw, the user will not be able to upload
  if (!user) throw new Error('Unauthorized');

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: user.uuid };
};

export const UploadFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profilePicture: f({ image: { maxFileSize: '2MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(useMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);

      await db
        .update(users)
        .set({
          profilePictureURL: file.url
        })
        .where(eq(users.uuid, metadata.userId as string));
    }),
  imageUpload: f({ image: { maxFileSize: '2MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(useMiddleware)
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
    })
} satisfies FileRouter;

export type UploadFileRouter = typeof UploadFileRouter;
