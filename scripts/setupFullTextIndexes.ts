import fetch from 'cross-fetch';

// @ts-ignore
globalThis.fetch = fetch;

import { MySqlColumn } from 'drizzle-orm/mysql-core';
import * as schema from '../db/schema';
import { sql } from 'drizzle-orm';
import db from '../src/drizzle';

const INDEXES: Record<string, MySqlColumn[]> = {
  products: [schema.products.name, schema.products.description]
};

async function setupIndexes() {
  for (const tableName in INDEXES) {
    const query = `
      ALTER TABLE ${tableName}
      ADD FULLTEXT(${INDEXES[tableName].map(col => col.name).join(', ')})
    `;

    console.log(query);
    db.execute(sql.raw(query));
  }
}

setupIndexes();

