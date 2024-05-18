import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../config';

const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.user, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;
