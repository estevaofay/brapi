import { getServerSession } from 'next-auth';
import DashboardLayout from '~/app/dashboard/components/Layout';
import { TokenTable } from '~/app/dashboard/components/TokenTable';
import { UsageChart } from '~/app/dashboard/components/UsageChart';
import { authOptions } from '~/pages/api/auth/[...nextauth]';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <DashboardLayout user={session?.user}>
      <div className="md:grid  md:grid-cols-3 gap-4 min-h-screen">
        <div className="flex flex-col col-span-2 gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Seus tokens</h2>
            <TokenTable />
          </div>

          {/* @ts-expect-error Server Component */}
          <UsageChart userId={session.user.id} />
        </div>

        <div className="col-span-1">
          <div className="p-4">
            <h2 className="text-2xl font-bold">Resumo</h2>
            <ul className="list-disc pl-4">
              <li>
                Aqui você pode ver o seu resumo de uso da API, como por exemplo,
                o número de requisições feitas, quando cada requisição foi feita
                e também o criar novos tokens de acesso.
              </li>
              <li>
                Para usar o token de acesso, basta adicionar{' '}
                <code className="bg-gray-800 rounded-md px-2 py-1">
                  ?token=SEU_TOKEN
                </code>{' '}
                na URL da requisicão. Por exemplo:{' '}
                <code className="bg-gray-800 rounded-md px-2 py-1">
                  https://brapi.dev/api/quote/PETR4?token=SEU_TOKEN
                </code>
              </li>
            </ul>
          </div>
        </div>

        <a
          href="/api/auth/signout?callbackUrl=/"
          className="link flex self-end justify-end col-span-3"
        >
          Sair
        </a>
      </div>
    </DashboardLayout>
  );
}
