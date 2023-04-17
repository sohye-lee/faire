import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;
    const latitudeNum = parseFloat(latitude!.toString());
    const longitudeeNum = parseFloat(longitude!.toString());
    const posts = await client.post.findMany({
      where: {
        latitude: {
          gte: latitudeNum - 0.02,
          lte: latitudeNum + 0.02,
        },
        longitude: {
          gte: longitudeeNum - 0.02,
          lte: longitudeeNum + 0.02,
        },
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
        _count: {
          select: {
            votes: true,
            answers: true,
          },
        },
      },
    });
    console.log(req.query);
    res.json({
      ok: true,
      posts,
    });
  }

  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
