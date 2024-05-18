import { Request, Response } from 'express';
import { VERIFY_TOKEN } from '../config';
import { handleMessage } from '../services/messengerService';

export const verifyWebhook = (req: Request, res: Response): void => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

export const handleWebhookEvent = (req: Request, res: Response): void => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry: any) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      const senderPsid = webhookEvent.sender.id;
      const receivedMessage = webhookEvent.message;

      if (receivedMessage && receivedMessage.text) {
        const response = {
          text: `You sent the message: "${receivedMessage.text}". How can I help you!`,
        };

        handleMessage(senderPsid, response);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};
