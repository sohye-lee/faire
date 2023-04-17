import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const {
      session: { user },
    } = req;
    const reviews = await client.review.findMany({
      where: {
        createdForId: user?.id,
      },
      include: {
        createdBy: true,
      },
    });
    res.json({
      ok: true,
      reviews,
    });
  }

  if (req.method === 'POST') {
    const {
      body: { review, score, createdForId },
      session: { user },
    } = req;
    const newReview = await client.review.create({
      data: {
        review,
        score,
        createdFor: {
          connect: {
            id: createdForId,
          },
        },
        createdBy: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.status(200).json({ ok: true, newReview });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
