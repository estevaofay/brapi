import { InferModel } from 'drizzle-orm';
import {
  uuid,
  pgTable,
  text,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';

export const apiToken = pgTable(
  'APIToken',
  {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    active: boolean('active').notNull().default(true),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    index: index().on(table.userId),
  }),
);

export type IAPIToken = InferModel<typeof apiToken, 'select'>;
export type INewAPIToken = InferModel<typeof apiToken, 'insert'>;
