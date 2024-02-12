// mysql
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql';
var database = mysql.createConnection(process.env.JAWSDB_URL);

database.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected to mySQL DB');
  }
});

export default database;
