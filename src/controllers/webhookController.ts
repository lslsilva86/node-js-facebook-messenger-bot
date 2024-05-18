import { Request, Response } from 'express';
import {
  getProductDescription,
  getProductPrice,
  getProductShippingFee,
  handleBuyProduct,
} from '../services/productService';
import { handleMessage, isFirstInteraction } from '../services/messengerService';

export const verifyWebhook = (req: Request, res: Response): void => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || '';

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

export const handleWebhookEvent = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhookEvent = entry.messaging[0];
      const senderPsid = webhookEvent.sender.id;
      const receivedMessage = webhookEvent.message;

      if (receivedMessage && receivedMessage.text) {
        const messageText: string = receivedMessage.text;
        let responseText: string;
        const isInitialInteraction = await isFirstInteraction(senderPsid);

        try {
          if (!isInitialInteraction) {
            if (messageText.startsWith('/desc ')) {
              const productId = messageText.replace('/desc ', '').trim();
              responseText = await getProductDescription(productId);
            } else if (messageText.startsWith('/price ')) {
              const productId = messageText.replace('/price ', '').trim();
              const price = await getProductPrice(productId);
              responseText = `The price of the product is $${price}`;
            } else if (messageText.startsWith('/shipping ')) {
              const productId = messageText.replace('/shipping ', '').trim();
              responseText = await getProductShippingFee(productId);
            } else if (messageText.startsWith('/buy ')) {
              const productId = messageText.replace('/buy ', '').trim();
              responseText = await handleBuyProduct(senderPsid, productId);
            } else {
              responseText = "Sorry, I didn't understand that query. How can I assist you further?";
            }
          } else {
            responseText = 'Hi there! How can I assist you today?';
          }
        } catch (error) {
          if (error instanceof Error && error.message === 'ProductNotFound') {
            responseText = 'Sorry, the product you are looking for is not available.';
          } else {
            responseText = "Sorry, I didn't understand that query. How can I assist you further?";
          }
        }
        await handleMessage(senderPsid, { text: responseText }, isInitialInteraction);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};
