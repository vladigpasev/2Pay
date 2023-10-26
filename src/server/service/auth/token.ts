import { InferSelectModel, and, eq } from 'drizzle-orm';
import { tokens, users } from '../../../../db/schema';
import { value, Value } from '@/utils/value';
import jsonwebtoken from 'jsonwebtoken';
import * as crypto from 'crypto';
import db from '@/drizzle';

export interface Tokens {
  refreshToken: string;
  token: string;
}

const REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day
const REFRESH_TOKEN_DEATH_TIME = 1000 * 60 * 60 * 24 * 5; // 5 days
const TOKEN_EXPIRATION_TIME = '10s'; // TODO: Shorten

type User = InferSelectModel<typeof users>;

const generateRefreshToken = () => crypto.randomBytes(128).toString('hex');

const signToken = (data: any) =>
  jsonwebtoken.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRATION_TIME
  });

async function createTokenForUser(user: User): Promise<Tokens> {
  const token = signToken({ uuid: user.uuid, email: user.email, username: user.email });
  const refreshToken = generateRefreshToken();

  await deleteToken(user.uuid);

  await db.insert(tokens).values({
    refreshToken,
    refreshTokenExpiration: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME),
    dateOfDeath: new Date(Date.now() + REFRESH_TOKEN_DEATH_TIME),
    userUuid: user.uuid
  });

  return { token, refreshToken };
}

async function refreshToken(
  userData: { uuid: string; email: string; username: string },
  oldRefreshToken: string
): Promise<Value<Tokens>> {
  const tokenRecords = await db
    .select()
    .from(tokens)
    .where(and(eq(tokens.userUuid, userData.uuid), eq(tokens.refreshToken, oldRefreshToken)))
    .limit(1);

  if (tokenRecords.length != 1) return value.error('Token not found!');

  await deleteToken(userData.uuid);

  const tokenRecord = tokenRecords[0];

  if (Date.now() > tokenRecord.dateOfDeath.getTime() || Date.now() > tokenRecord.refreshTokenExpiration.getTime())
    return value.error('Token expired!');

  const token = signToken({ uuid: userData.uuid, email: userData.email, username: userData.email });
  const refreshToken = generateRefreshToken();

  await db.insert(tokens).values({
    refreshToken,
    refreshTokenExpiration: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_TIME),
    dateOfDeath: tokenRecord.dateOfDeath,
    userUuid: userData.uuid
  });

  return value.value({ token, refreshToken });
}

async function deleteToken(userUuid: string) {
  await db.delete(tokens).where(eq(tokens.userUuid, userUuid));
}

export { createTokenForUser, refreshToken, deleteToken };
