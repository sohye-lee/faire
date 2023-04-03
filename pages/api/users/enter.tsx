import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import twilio from 'twilio';
import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : { email } ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(1000000000 + Math.random() * 9000000000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.MESSAGING_SID,
    //   to: phone,
    //   body: `Your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const message = await mail.send({
    //   from: 'sohyelee@gmail.com',
    //   to: 'sohyelee@gmail.com',
    //   subject: 'Welcome to Klozet',
    //   text: `Your token is ${payload}.`,
    //   html: `<p>Your token is ${payload}</p>`,
    // });
    // console.log(message);
  }

  res.status(200).json({ ok: true, user });
}

export default withHandler({ method: 'POST', handler, isPrivate: false });
