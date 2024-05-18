import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import ngrok from 'ngrok';
import webhookRoutes from './routes/webhookRoutes';
import { PORT } from './config';
import sequelize from './services/dbService';
import User from './models/User';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/webhook', webhookRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
      const url = await ngrok.connect({
        addr: PORT,
        subdomain: 'respondio',
      });
      console.log(`Ngrok tunnel opened at: ${url}`);
      console.log(`Set the following URL as your webhook callback URL in the Facebook App Dashboard: ${url}/webhook`);
    } catch (err) {
      console.error('Error starting Ngrok:', err);
    }
  });
});
