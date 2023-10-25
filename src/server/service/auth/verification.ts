import { users } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import db from '@/drizzle';

async function verifyUser(verificationToken: string) {
  const result = await db
    .update(users)
    .set({
      verified: true,
      verificationToken: null
    })
    .where(eq(users.verificationToken, verificationToken));

  return result.rowsAffected > 0;
}

async function isVerified(uuid: string) {
  const results = await db
    .select({
      verified: users.verified
    })
    .from(users)
    .where(eq(users.uuid, uuid));

  return results[0]?.verified ?? false;
}

export { verifyUser, isVerified };
