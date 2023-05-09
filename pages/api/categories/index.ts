import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const category = await client.category.create({
      data: {
        name,
      },
    });
    res.json({ ok: true, category });
  }

  if (req.method === 'GET') {
    const categories = await client.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    res.json({ ok: true, categories });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
