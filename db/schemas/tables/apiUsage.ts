import { InferModel } from 'drizzle-orm';
import {
  uuid,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '~/db/schemas/tables/user';
import { apiToken } from '~/db/schemas/tables/apiToken';

export const apiUsage = pgTable('APIUsage', {
  id: serial('id').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  apiTokenId: uuid('apiTokenId')
    .notNull()
    .references(() => apiToken.id, {
      onDelete: 'cascade',
    }),
  endpoint: text('endpoint').notNull(),
  count: integer('count').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export type IAPIUsage = InferModel<typeof apiUsage, 'select'>;
export type INewAPIUsage = InferModel<typeof apiUsage, 'insert'>;
