import { and, eq } from 'drizzle-orm';

import type { Adapter } from '@auth/core/adapters';
import { users, sessions, accounts, verificationTokens } from '~/db/schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import axios from 'axios';
import * as schema from '../schemas';
import { serverlessClient } from '~/db';

export function DrizzleAdapter(client: NodePgDatabase<typeof schema>): Adapter {
  return {
    async createUser(data) {
      await axios.post(`${process.env.DISCORD_WEBHOOK_URL}`, {
        username: 'brapi',
        avatar_url: 'https://brapi.dev/favicon.png',
        embeds: [
          {
            title: `New User`,
            description: `**${data.name}** just signed up!`,
            color: 7419530,
            fields: [
              {
                name: 'Name',
                value: data.name,
              },
              {
                name: 'Email',
                value: data.email,
              },
            ],
          },
        ],
      });

      await serverlessClient.connect();

      const dbData = await client
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return dbData;
    },
    async getUser(data) {
      await serverlessClient.connect();

      const dbData = client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return dbData;
    },
    async getUserByEmail(data) {
      await serverlessClient.connect();

      const dbData = client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return dbData;
    },
    async createSession(data) {
      await serverlessClient.connect();

      const dbData = await client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0]);

      await serverlessClient.clean();

      return dbData;
    },
    async getSessionAndUser(data) {
      await serverlessClient.connect();

      const dbData = await client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return dbData;
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error('No user id.');
      }

      await serverlessClient.connect();

      const dbData = await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]);

      await serverlessClient.clean();

      return dbData;
    },
    async updateSession(data) {
      await serverlessClient.connect();

      const dbData = await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);

      await serverlessClient.clean();

      return dbData;
    },
    async linkAccount(rawAccount) {
      await serverlessClient.connect();

      const updatedAccount = await client
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .then((res) => res[0]);

      await serverlessClient.clean();

      // Drizzle will return `null` for fields that are not defined.
      // However, the return type is expecting `undefined`.
      const account = {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      };

      return account;
    },
    async getUserByAccount(account) {
      await serverlessClient.connect();

      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      await serverlessClient.clean();

      if (!dbAccount) {
        return null;
      }

      return dbAccount.User;
    },
    async deleteSession(sessionToken) {
      await serverlessClient.connect();
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return session;
    },
    async createVerificationToken(token) {
      await serverlessClient.connect();

      const dbData = await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);

      await serverlessClient.clean();

      return dbData;
    },
    async useVerificationToken(token) {
      try {
        await serverlessClient.connect();

        const dbData = await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )
          .returning()
          .then((res) => res[0] ?? null);

        await serverlessClient.clean();

        return dbData;
      } catch (err) {
        throw new Error('No verification token found.');
      }
    },
    async deleteUser(id) {
      await serverlessClient.connect();

      const dbData = await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return dbData;
    },
    async unlinkAccount(account) {
      await serverlessClient.connect();

      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        )
        .returning()
        .then((res) => res[0] ?? null);

      await serverlessClient.clean();

      return { provider, type, providerAccountId, userId };
    },
  };
}
