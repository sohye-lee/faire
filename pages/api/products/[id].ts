import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  // if (id) {
  const product = await client.product.findUnique({
    where: { id: +id?.toString()! },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  res.json({ ok: true, product });
  // } else {
  //   res.status(404).end();
  // }
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
