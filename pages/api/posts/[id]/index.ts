import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Post } from '@prisma/client';

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
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      _count: {
        select: {
          answers: true,
          votes: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
