import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const posts = await client.post.findMany({});
    res.json({
      ok: true,
      posts,
    });
  }

  if (req.method === 'POST') {
    const {
      body: { question },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.status(200).json({ ok: true, post });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
