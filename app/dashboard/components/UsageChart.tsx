import { LineChart, Card, Title } from '@tremor/react';
import { sql, eq } from 'drizzle-orm';
import { serverlessClient, db } from '~/db';
import { apiUsage } from '~/db/schemas';

export const UsageChart = async ({ userId }) => {
  await serverlessClient.connect();

  const chartData = await db
    .select({
      hour: sql<string>`DATE_TRUNC('hour', ${apiUsage.createdAt}) AS hour`,
      hourlyCount: sql<number>`SUM(count) AS hourly_count`,
    })
    .from(apiUsage)
    .where(eq(apiUsage.userId, userId))
    .groupBy(sql`DATE_TRUNC('hour', ${apiUsage.createdAt})`, apiUsage.endpoint)
    .orderBy(sql`hour`);

  await serverlessClient.clean();

  const parsedChartData = chartData.map((data) => ({
    Requisições: Number(data.hourlyCount) || 0,
    createdAt: new Date(data.hour).toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  }));

  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const startDate =
    parsedChartData?.[0]?.createdAt ||
    today.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
    });

  const endDate =
    parsedChartData?.[parsedChartData?.length - 1]?.createdAt ||
    oneWeekAgo.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
    });

  return (
    <Card>
      <Title>
        Uso da API entre {startDate} e {endDate}
      </Title>
      <LineChart
        className="mt-6"
        data={parsedChartData}
        index="createdAt"
        categories={['Requisições']}
        colors={['purple']}
        yAxisWidth={40}
        autoMinValue
        curveType="monotone"
        noDataText="Você ainda não fez nenhuma requisição à API."
      />
    </Card>
  );
};
