import sgMail from '@sendgrid/mail';
import { sendEmail } from '../../services/emailService';

jest.mock('@sendgrid/mail');

describe('Email Service', () => {
  describe('sendEmail', () => {
    it('should send an email', async () => {
      (sgMail.send as jest.Mock).mockResolvedValue({});
      await sendEmail('Test Subject', 'Test Text');
      expect(sgMail.send).toHaveBeenCalled();
    });

    it('should handle errors when sending an email', async () => {
      (sgMail.send as jest.Mock).mockRejectedValue(new Error('Failed to send email'));
      await expect(sendEmail('Test Subject', 'Test Text')).resolves.not.toThrow();
    });
  });
});
