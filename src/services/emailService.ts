import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (subject: string, text: string): Promise<void> => {
  const msg = {
    to: process.env.RECIPIENT_EMAIL!,
    from: process.env.SENDGRID_SENDER_EMAIL!,
    subject: subject,
    text: text,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error: any) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
  }
};
