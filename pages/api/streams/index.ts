import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const { page } = req.query;
    console.log(page);
    const contentSize = 10;
    const streams = await client.stream.findMany({
      include: {
        messages: true,
        user: { select: { id: true, name: true, avatarUrl: true } },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: contentSize,
      skip: page ? contentSize * (+page - 1) : 0,
    });
    const pageCount = Math.ceil(
      (await client.stream.findMany({})).length / contentSize
    );
    res.json({
      ok: true,
      streams,
      pageCount,
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
        price,
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
