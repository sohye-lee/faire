import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const user = await client.user.upsert({
    where: {
      ...(email && { email }),
      ...(phone && { phone }),
    },
    create: {
      name: 'anonymous',
      ...(email && { email }),
      ...(phone && { phone }),
    },
    update: {},
  });
  console.log(user);

  res.status(200).end();
}

export default withHandler('POST', handler);
