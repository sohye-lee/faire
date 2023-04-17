import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const user = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  res.status(200).json({ ok: true, user });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
