import { users } from '../../../../db/schema';
import * as bcrypt from 'bcrypt';
import { id } from '@/utils/id';
import db from '@/drizzle';
import * as uuid from 'uuid';
import { InferSelectModel } from 'drizzle-orm';
import { createTokenForUser } from './token';
import { sendMail } from '@/server/lib/sendMail';
import { Value, value } from '@/utils/value';

const SALT_ROUNDS = 5;

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const template_EmailBody = ({ username, verificationToken }: { username: string; verificationToken: string }) => `
  <p>Hello ${username},</p>
  <p>Welcome to the N2D2T platform.</p>
  <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/verify/${verificationToken}"><h1>Verify your E-Mail!</h1></a>
`;

async function registerUserByEmail(data: RegisterData): Promise<Value<{ token: string; refreshToken: string }>> {
  const user: InferSelectModel<typeof users> = {
    uuid: uuid.v4(),
    authProvider: 'email',
    username: data.username,
    email: data.email,
    password: await bcrypt.hash(data.password, SALT_ROUNDS),
    verified: false,
    verificationToken: id()
  };

  try {
    await db.insert(users).values(user);
  } catch (error: any) {
    return value.error(error.message.includes('AlreadyExists') ? 'This user already exists!' : 'Something went wrong!');
  }

  const tokens = await createTokenForUser(user);

  sendMail({
    subject: 'Verify your N2D2T account',
    body: template_EmailBody({ username: user.username, verificationToken: user.verificationToken! }),
    to: user.email
  });

  return value.value(tokens);
}

export { registerUserByEmail };
