// mysql
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
var database = await mysql.createConnection(process.env.JAWSDB_URL);

database.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected to mySQL DB');
  }
});

export default database;
