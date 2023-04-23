import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const user = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.status(200).json({ ok: true, user });
  }

  if (req.method === 'POST') {
    const {
      body: { name, email, phone },
      session: { user },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email) {
      const alreadyExists = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (alreadyExists && name === alreadyExists?.name) {
        return res.json({ ok: false, error: 'Email already taken.' });
      } else if (name != alreadyExists?.name) {
        if (name) {
          await client.user.update({
            where: {
              id: user?.id,
            },
            data: {
              name,
            },
          });
        }
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
            name,
          },
        });
      }
    }

    if (phone) {
      const alreadyExists = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (alreadyExists && alreadyExists.name === name) {
        return res.json({ ok: false, error: 'Phone number already exists.' });
      } else if (alreadyExists?.name !== name) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            name,
          },
        });
        console.log(name);
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
            name,
          },
        });
      }
    }

    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler, isPrivate: true })
);
