import { NextRequest, NextResponse } from 'next/server';
import db from '@/drizzle';
import { users } from '../../../../db/schema';
import { and, eq } from 'drizzle-orm';
import { createTokenForUser } from '@/server/service/auth/token';

interface GoogleData {
  id: string;
  email: string;
  name: string;
  picture: string;
}

async function accessCodeToAccessToken(accessCode: string) {
  const formData = new FormData();
  formData.append('code', accessCode);
  formData.append('client_id', process.env.NEXT_PUBLIC_GOOGLE_ID!);
  formData.append('client_secret', process.env.GOOGLE_SECRET!);
  formData.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}auth/oauth`);
  formData.append('grant_type', 'authorization_code');

  const req = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: formData
  });

  const data = await req.json();

  return data.access_token as string;
}

async function getGoogleUserData(accessCode: string) {
  const accessToken = await accessCodeToAccessToken(accessCode);
  if (typeof accessToken !== 'string') return null;

  const googleDataReq = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return (await googleDataReq.json()) as GoogleData;
}

async function authGoogleUser(data: GoogleData) {
  const existingUserRecord = (
    await db
      .select()
      .from(users)
      .where(and(eq(users.authProvider, 'google'), eq(users.uuid, data.id)))
      .limit(1)
  )[0];

  const user = existingUserRecord ?? {
    uuid: data.id,
    authProvider: 'google',
    name: data.name,
    email: data.email,
    password: null,
    verified: true,
    verificationToken: null,
    profilePictureURL: data.picture
  };

  if (existingUserRecord == null) await db.insert(users).values(user);

  return await createTokenForUser({
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    profilePictureURL: user.profilePictureURL!,
    authProvider: user.authProvider,
    verified: user.verified
  });
}

const handler = async (req: NextRequest) => {
  const search = new URL(req.url).searchParams;
  if (!search.has('code')) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

  const googleData = await getGoogleUserData(search.get('code')!);
  if (googleData == null || !('id' in googleData)) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

  const tokens = await authGoogleUser(googleData);

  const res = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}${search.get('state') ?? ''}?refreshToken=${tokens.refreshToken}`
  );

  res.cookies.set('token', tokens.token);

  return res;
};

export { handler as GET };

