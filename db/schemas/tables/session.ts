import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';

export const sessions = pgTable('Session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});
