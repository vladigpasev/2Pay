import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  mysqlEnum,
  boolean,
  float,
  index
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

export const authProviderEnum = mysqlEnum('authProvider', ['email', 'google', 'facebook']);

export const users = mysqlTable('users', {
  uuid: varchar('uuid', { length: 256 })
    .default(sql`(uuid())`)
    .notNull()
    .primaryKey(),
  authProvider: authProviderEnum.notNull(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 70 }).notNull().unique(),
  password: varchar('password', { length: 256 }),
  verified: boolean('verified').default(false).notNull(),
  verificationToken: varchar('verificationToken', { length: 12 }).unique(),
  profilePictureURL: varchar('profilePicture', { length: 256 })
});

export const tokens = mysqlTable('tokens', {
  refreshToken: varchar('refreshToken', { length: 256 }).notNull().unique().primaryKey(),
  refreshTokenExpiration: timestamp('refreshTokenExpiration').notNull(),
  dateOfDeath: timestamp('dateOfDeath').notNull(),
  userUuid: varchar('userUuid', { length: 256 }).notNull()
});

export const companies = mysqlTable('companies', {
  uuid: varchar('uuid', { length: 256 })
    .default(sql`(uuid())`)
    .notNull()
    .primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  contactEmail: varchar('contactEmail', { length: 256 }).notNull(),
  description: varchar('description', { length: 2048 }).notNull(),
  logoURL: varchar('logoURL', { length: 256 }),
  creatorUuid: varchar('creatorUuid', { length: 256 }).notNull()
});

export const products = mysqlTable('products', {
  uuid: varchar('uuid', { length: 256 })
    .default(sql`(uuid())`)
    .notNull()
    .primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  price: float('price').notNull(),
  description: varchar('description', { length: 2048 }).notNull(),
  pictureURL: varchar('pictureURL', { length: 256 }),
  companyUuid: varchar('companyUuid', { length: 256 }).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(tokens),
  companies: many(companies)
}));

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userUuid],
    references: [users.uuid]
  })
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  products: many(products),
  creator: one(users, {
    fields: [companies.creatorUuid],
    references: [users.uuid]
  })
}));

export const productsRelations = relations(products, ({ one }) => ({
  company: one(companies, {
    fields: [products.companyUuid],
    references: [companies.uuid]
  })
}));

