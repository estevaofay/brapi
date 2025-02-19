import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('User', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});
