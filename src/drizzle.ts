import 'dotenv/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import * as schema from '../db/schema';

import * as dotenv from 'dotenv';
dotenv.config();

// create the connection
const connection = connect({
  url: process.env.DATABASE_URL
});

const db = drizzle(connection, { schema });

export default db;

