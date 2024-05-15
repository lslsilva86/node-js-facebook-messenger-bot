import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

export default db;
