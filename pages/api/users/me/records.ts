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
        select: {
          id: true,
          name: true,
          image: true,
          price: true,
          _count: {
            select: {
              records: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({ ok: true, records });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: true })
);
