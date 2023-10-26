import { users } from '../../../../db/schema';
import db from '@/drizzle';
import { Tokens } from './token';
import { Value } from '@/utils/value';
import { LoginData } from './emailAuthentication';

async function loginUserByEmail(data: LoginData): Promise<Value<Tokens>> {
  const userRecords = await db.select().from(users).where(eq(users.email, data.email));
}
