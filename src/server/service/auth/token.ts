import { InferSelectModel, IsAny, and, eq } from 'drizzle-orm';
import { tokens, users } from '../../../../db/schema';
import { value, Value } from '@/utils/value';
import jsonwebtoken from 'jsonwebtoken';
import * as crypto from 'crypto';
import db from '@/drizzle';
import IUser from '@/types/User';

export interface Tokens {
  refreshToken: string;
  token: string;
}

const REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day
const REFRESH_TOKEN_DEATH_TIME = 1000 * 60 * 60 * 24 * 5; // 5 days
const TOKEN_EXPIRATION_TIME = '10m';

type User = InferSelectModel<typeof users>;

const generateRefreshToken = () => crypto.randomBytes(128).toString('hex');

const signToken = (data: IUser) =>
  jsonwebtoken.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_EXPIRATION_TIME
  });

export const queryAndCreateUserData = async (uuid: string) => {
  const [user] = await db.select().from(users).where(eq(users.uuid, uuid));
  return await createTokenForUser({
    authProvider: user.authProvider,
    email: user.email,
    profilePictureURL: user.profilePictureURL || '',
    name: user.name,
    uuid: user.uuid,
    verified: user.verified,
    stripeSellerId: user.stripeSellerId
  });
};

async function createTokenForUser(user: IUser): Promise<Tokens> {
  const token = signToken({
    uuid: user.uuid,
    email: user.email,
    name: user.name,
    profilePictureURL: user.profilePictureURL,
    authProvider: user.authProvider,
    verified: user.verified,
    stripeSellerId: user.stripeSellerId
  });
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

async function refreshToken(userData: IUser, oldRefreshToken: string, updateUserData: boolean): Promise<Value<Tokens>> {
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

  if (updateUserData)
    userData = (
      await db
        .select({
          uuid: users.uuid,
          email: users.email,
          name: users.name,
          profilePictureURL: users.profilePictureURL
        })
        .from(users)
        .where(eq(users.uuid, userData.uuid))
        .limit(1)
    )[0] as IUser;

  const token = signToken({
    uuid: userData.uuid,
    email: userData.email,
    name: userData.name,
    profilePictureURL: userData.profilePictureURL,
    authProvider: userData.authProvider,
    verified: userData.verified,
    stripeSellerId: userData.stripeSellerId
  });
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
