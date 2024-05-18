import request from 'supertest';
import express from 'express';
import { verifyWebhook, handleWebhookEvent } from '../../controllers/webhookController';

const app = express();
app.use(express.json());

describe('Webhook Controller', () => {
  beforeEach(() => {
    app.get('/webhook', verifyWebhook);
    app.post('/webhook', handleWebhookEvent);
  });

  describe('verifyWebhook', () => {
    it('should verify the webhook with correct token', async () => {
      process.env.VERIFY_TOKEN = 'test_verify_token';
      const res = await request(app).get(
        '/webhook?hub.mode=subscribe&hub.verify_token=test_verify_token&hub.challenge=1234'
      );
      expect(res.status).toBe(200);
      expect(res.text).toBe('1234');
    });

    it('should not verify the webhook with incorrect token', async () => {
      process.env.VERIFY_TOKEN = 'test_verify_token';
      const res = await request(app).get('/webhook?hub.mode=subscribe&hub.verify_token=wrong_token');
      expect(res.status).toBe(403);
    });
  });

  describe('handleWebhookEvent', () => {
    it('should handle a webhook event', async () => {
      const res = await request(app)
        .post('/webhook')
        .send({
          object: 'page',
          entry: [
            {
              messaging: [
                {
                  sender: { id: '1234' },
                  message: { text: 'Hi' },
                },
              ],
            },
          ],
        });
      expect(res.status).toBe(200);
      expect(res.text).toBe('EVENT_RECEIVED');
    });

    it('should return 404 for non-page events', async () => {
      const res = await request(app).post('/webhook').send({
        object: 'user',
      });
      expect(res.status).toBe(404);
    });
  });
});
