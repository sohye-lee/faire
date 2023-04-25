import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const streams = await client.stream.findMany({
      include: {
        messages: true,
        user: { select: { id: true, name: true } },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      streams,
    });
  }

  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        image: 'xx',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.status(200).json({ ok: true, stream });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
