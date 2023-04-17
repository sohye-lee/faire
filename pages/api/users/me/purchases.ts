import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
  });

  res.status(200).json({ ok: true, purchases });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
