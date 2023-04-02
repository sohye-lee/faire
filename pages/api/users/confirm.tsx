import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) return res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };

  await req.session.save();

  res.status(200).json({ ok: true, token });
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'KlozetCookie',
  password: '845811845811845811845811845811845811',
});
