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
      query: { id },
      session: { user },
    } = req;
    const product = await client.product.findUnique({
      where: { id: +id?.toString()! },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
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
      },
    });
    const terms = product?.name.split(' ').map((word) => ({
      name: {
        contains: word,
      },
    }));
    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
    });
    const isFavorited = Boolean(
      await client.record.findFirst({
        where: {
          userId: user?.id,
          productId: +id?.toString()!,
          type: 'Favorite',
        },
        select: {
          id: true,
        },
      })
    );
    res.json({ ok: true, product, isFavorited, relatedProducts });
  }

  if (req.method === 'PUT') {
    const {
      body: { name, description, price, imageIds },
      query: { id },
    } = req;

    const updatedProduct = await client.product.update({
      where: {
        id: +id!,
      },
      data: {
        name,
        description,
        price,
        imageIds,
      },
    });

    res.json({ ok: true, product: updatedProduct });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'PUT'], handler })
);
