import { getServerSession } from 'next-auth';
import { CreateNewToken } from '~/app/dashboard/components/CreateNewToken';

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen flex flex-col mt-12 container gap-4">
      <h1 className="flex text-4xl font-bold items-center justify-center">
        Dashboard
      </h1>

      <div className="items-center justify-center flex gap-2">
        <img src={session.user.image} className="rounded-full w-16 h-16" />
        <div className="flex flex-col">
          <p className="text-2xl">{session.user.name}</p>
          <p className="text-xl">{session.user.email}</p>
          <CreateNewToken />
        </div>
      </div>
    </div>
  );
}
