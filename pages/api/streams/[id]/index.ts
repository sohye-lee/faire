import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const stream = await client.stream.findUnique({
      where: {
        id: +id?.toString()!,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        messages: {
          select: {
            message: true,
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
    if (stream) {
      res.json({ ok: true, stream });
    } else {
      res.status(404).end();
    }
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
