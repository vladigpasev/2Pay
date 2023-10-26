import { int, timestamp, mysqlTable, primaryKey, varchar, mysqlEnum, boolean } from 'drizzle-orm/mysql-core';
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

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(tokens)
}));

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userUuid],
    references: [users.uuid]
  })
}));
