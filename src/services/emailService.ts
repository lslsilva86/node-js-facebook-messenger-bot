import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, RECIPIENT_EMAIL, SENDGRID_SENDER_EMAIL } from '../config';

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (subject: string, text: string): Promise<void> => {
  const msg = {
    to: RECIPIENT_EMAIL,
    from: SENDGRID_SENDER_EMAIL,
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
