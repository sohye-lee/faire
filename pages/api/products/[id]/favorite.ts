import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.record.findFirst({
    where: {
      productId: +id?.toString()!,
      userId: user?.id,
      type: 'Favorite',
    },
  });

  if (alreadyExists) {
    await client.record.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.record.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id?.toString()!,
          },
        },
        type: 'Favorite',
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
