import client from '../../libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    res.status(401).end();
  }
  console.log(req.body);
  res.status(200).end();
}

export default withHandler('POST', handler);
