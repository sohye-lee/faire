import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  res.status(200).json({ ok: true, favorites });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
