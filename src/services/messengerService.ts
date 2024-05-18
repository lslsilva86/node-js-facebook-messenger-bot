import axios from 'axios';
import { PAGE_ACCESS_TOKEN } from '../config';
import User from '../models/User';

const greetings = ['How are you?', 'I hope you are doing well.', 'I hope you’re having a great day.'];

export const isFirstInteraction = async (senderId: string): Promise<boolean> => {
  const user = await User.findOne({ where: { senderId } });
  if (!user) {
    await User.create({ senderId });
    return true;
  }
  return false;
};

export const sendGreetingMessage = async (senderId: string): Promise<void> => {
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  await sendMessage(senderId, randomGreeting);
};

export const sendMessage = async (senderId: string, message: string): Promise<void> => {
  const requestBody = {
    recipient: { id: senderId },
    message: { text: message },
  };

  try {
    await axios.post(`https://graph.facebook.com/v12.0/me/messages`, requestBody, {
      params: { access_token: PAGE_ACCESS_TOKEN },
    });
    console.log('message sent!');
  } catch (error) {
    console.error('Unable to send message:', error);
  }
};

export const handleMessage = async (senderPsid: string, response: any): Promise<void> => {
  try {
    const isFirst = await isFirstInteraction(senderPsid);
    if (isFirst) {
      await sendGreetingMessage(senderPsid);
    }

    await sendMessage(senderPsid, response.text);
  } catch (err) {
    console.error('Error handling message:', err);
  }
};
