import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Type } from '@prisma/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { type },
  } = req;

  console.log(type);
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      type: type as Type,
    },
    include: {
      product: {
        include: {
          records: true,
        },
      },
    },
  });
  console.log(records);
  res.status(200).json({ ok: true, records });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
