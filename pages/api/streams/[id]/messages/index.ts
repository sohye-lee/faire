import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { message },
    query: { id },
    session: { user },
  } = req;

  if (req.method === 'GET') {
    const messages = await client.message.findMany({
      where: {
        streamId: +id!,
      },
    });
    res.json({ ok: true, messages });
  }

  if (req.method === 'POST') {
    if (!message || message === '' || !id) {
      return res.status(400).end();
    }

    const newMessage = await client.message.create({
      data: {
        message,
        user: {
          connect: {
            id: user?.id,
          },
        },
        stream: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });

    res.json({ ok: true, message: newMessage });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
