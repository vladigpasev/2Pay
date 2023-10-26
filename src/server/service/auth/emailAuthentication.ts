import { users } from '../../../../db/schema';
import * as bcrypt from 'bcrypt';
import { id } from '@/utils/id';
import db from '@/drizzle';
import { and, eq } from 'drizzle-orm';
import * as uuid from 'uuid';
import { InferSelectModel } from 'drizzle-orm';
import { Tokens, createTokenForUser } from './token';
import { sendMail } from '@/server/lib/sendMail';
import { Value, value } from '@/utils/value';

const SALT_ROUNDS = 5;

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const template_VerificationEmailBody = ({
  username,
  verificationToken
}: {
  username: string;
  verificationToken: string;
}) => `
  <p>Hello ${username},</p>
  <p>Welcome to the N2D2T platform.</p>
  <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/${verificationToken}"><h1>Verify your E-Mail!</h1></a>
`;

async function registerUserByEmail(data: RegisterData): Promise<Value<Tokens>> {
  const user: InferSelectModel<typeof users> = {
    uuid: uuid.v4(),
    authProvider: 'email',
    username: data.username,
    email: data.email,
    password: await bcrypt.hash(data.password, SALT_ROUNDS),
    verified: false,
    verificationToken: id(),
    profilePictureURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${id()}`
  };

  try {
    await db.insert(users).values(user);
  } catch (error: any) {
    return value.error(error.message.includes('AlreadyExists') ? 'This user already exists!' : 'Something went wrong!');
  }

  const tokens = await createTokenForUser({
    uuid: user.uuid,
    username: user.username,
    email: user.email,
    profilePictureURL: user.profilePictureURL!,
    authProvider: user.authProvider
  });

  sendMail({
    subject: 'Verify your N2D2T account',
    body: template_VerificationEmailBody({ username: user.username, verificationToken: user.verificationToken! }),
    to: user.email
  });

  return value.value(tokens);
}

async function loginUserByEmail(data: LoginData): Promise<Value<Tokens>> {
  const userRecords = await db
    .select()
    .from(users)
    .where(and(eq(users.email, data.email), eq(users.authProvider, 'email')))
    .limit(1);

  if (userRecords.length !== 1) return value.error('Email or password is incorrect!');

  const user = userRecords[0];

  const isPasswordValid = await bcrypt.compare(data.password, user.password!);

  if (!isPasswordValid) return value.error('Email or password is incorrect!');

  const tokens = await createTokenForUser({
    uuid: user.uuid,
    username: user.username,
    email: user.email,
    profilePictureURL: user.profilePictureURL!,
    authProvider: user.authProvider
  });

  return value.value(tokens);
}

export { registerUserByEmail, loginUserByEmail };
