import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';

export const apiUsage = pgTable('APIUsage', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  endpoint: text('endpoint').notNull(),
  count: text('count').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});
