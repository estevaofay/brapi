import {
  pgTable,
  text,
  timestamp,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';

export const apiToken = pgTable(
  'APIToken',
  {
    id: text('id').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    createdAt: timestamp('createdAt').notNull(),
    active: boolean('active').notNull(),
  },
  (table) => ({
    tokenIndex: uniqueIndex().on(table.token),
  }),
);
