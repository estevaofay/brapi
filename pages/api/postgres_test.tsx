import { NextApiRequest, NextApiResponse } from 'next';
import { db, serverlessClient } from '~/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const start = performance.now();

  await serverlessClient.connect();
  const result = await db.query.historicalData.findMany({});
  await serverlessClient.clean();

  const end = performance.now();

  res.status(200).json({
    took: (end - start).toFixed(0) + 'ms',
    results: result,
  });
};
