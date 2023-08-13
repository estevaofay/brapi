import { InferModel } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';

export const apiToken = pgTable(
  'APIToken',
  {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    active: boolean('active').notNull(),
  },
  (table) => ({
    tokenIndex: uniqueIndex().on(table.token),
  }),
);

export type IAPIToken = InferModel<typeof apiToken, 'select'>;
export type INewAPIToken = InferModel<typeof apiToken, 'insert'>;
