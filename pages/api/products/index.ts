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
    const products = await client.product.findMany({
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
        records: {
          select: {
            type: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            records: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      products,
    });
  }

  if (req.method === 'POST') {
    const {
      body: {
        name,
        price,
        description,
        latitude,
        longitude,
        categoryId,
        color,
        condition,
        imageIds,
      },
      session: { user },
    } = req;
    const product = await client.product
      .create({
        data: {
          name,
          price: +price,
          description,
          latitude,
          longitude,
          imageIds,
          color,
          condition,
          category: {
            connect: {
              id: +categoryId,
            },
          },
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      })
      .catch((e) => console.log(e));
    res.status(200).json({ ok: true, product });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
