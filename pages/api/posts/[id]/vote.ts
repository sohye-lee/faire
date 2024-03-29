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
  const alreadyExists = await client.vote.findFirst({
    where: {
      postId: +id?.toString()!,
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    await client.vote.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.vote.create({
      data: {
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
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
