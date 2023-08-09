import { NextApiRequest, NextApiResponse } from 'next';
import { dbClient } from '~/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const start = performance.now();

  await dbClient.connect();
  const result = await dbClient.query(`SELECT * from test_table`);
  await dbClient.clean();

  const end = performance.now();

  res.status(200).json({
    took: (end - start).toFixed(0) + 'ms',
    results: result.rows,
  });
};
