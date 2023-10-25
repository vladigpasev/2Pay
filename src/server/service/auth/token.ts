import { InferSelectModel, and, eq } from 'drizzle-orm';
import { tokens, users } from '../../../../db/schema';
import { value, Value } from '@/utils/value';
import jsonwebtoken from 'jsonwebtoken';
import * as crypto from 'crypto';
import db from '@/drizzle';

const REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day
const REFRESH_TOKEN_DEATH_TIME = 1000 * 60 * 60 * 24 * 5; // 5 days
const TOKEN_EXPIRATION_TIME = '10m'; // TODO: Shorten

type User = InferSelectModel<typeof users>;

const generateRefreshToken = () => crypto.randomBytes(128).toString('hex');

const signToken = (data: any) =>
  jsonwebtoken.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRATION_TIME
  });

async function createTokenForUser(user: User) {
  const token = signToken({ uuid: user.uuid, email: user.email, username: user.email });
  const refreshToken = generateRefreshToken();

  await db.insert(tokens).values({
    refreshToken,
    refreshTokenExpiration: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME),
    dateOfDeath: new Date(Date.now() + REFRESH_TOKEN_DEATH_TIME),
    userUuid: user.uuid
  });

  return { token, refreshToken };
}

async function refreshToken(
  user: User,
  oldRefreshToken: string
): Promise<Value<{ token: string; refreshToken: string }>> {
  const tokenRecords = await db
    .select()
    .from(tokens)
    .where(and(eq(tokens.userUuid, user.uuid), eq(tokens.refreshToken, oldRefreshToken)))
    .limit(1);

  if (tokenRecords.length != 1) return value.error('Token not found!');

  await deleteToken(user);

  const tokenRecord = tokenRecords[0];

  if (Date.now() > tokenRecord.dateOfDeath.getTime() || Date.now() > tokenRecord.refreshTokenExpiration.getTime())
    return value.error('Token expired!');

  const token = signToken({ uuid: user.uuid, email: user.email, username: user.email });
  const refreshToken = generateRefreshToken();

  await db.insert(tokens).values({
    refreshToken,
    refreshTokenExpiration: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME),
    dateOfDeath: tokenRecord.dateOfDeath,
    userUuid: user.uuid
  });

  return value.value({ token, refreshToken });
}

async function deleteToken(user: User) {
  await db.delete(tokens).where(eq(tokens.userUuid, user.uuid));
}

export { createTokenForUser, refreshToken, deleteToken };
