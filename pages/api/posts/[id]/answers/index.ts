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

  const post = await client.post.findUnique({
    where: {
      id: +id?.toString()!,
    },
  });
  if (!post) res.status(404).end();

  if (req.method === 'GET') {
    const answers = await client.answer.findMany({
      where: {
        postId: +id?.toString()!,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
            avatarUrl: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      answers,
    });
  }

  if (req.method === 'POST') {
    const { content } = req.body;
    const answer = await client.answer.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id?.toString()!,
          },
        },
      },
    });
    res.status(200).json({ ok: true, answer });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
