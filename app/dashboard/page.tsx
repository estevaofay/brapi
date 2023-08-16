import { getServerSession } from 'next-auth';
import DashboardLayout from '~/app/dashboard/components/Layout';
import { TokenTable } from '~/app/dashboard/components/TokenTable';

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <DashboardLayout user={session?.user}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold">Seus tokens</h2>
          <TokenTable />
        </div>

        <div className="col-span-1">
          <div className="p-4">
            {/* todo: add api usage cards here */}
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
      </div>
    </DashboardLayout>
  );
}
