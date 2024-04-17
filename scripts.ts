import sqlite3 from "sqlite3";
import { open } from "sqlite";

const opendb = async () => {
  return await open({
    filename: "db.db",
    driver: sqlite3.Database,
  });
};

(async () => {
  const db = await opendb();
  await db.run(`CREATE TABLE IF NOT EXISTS user (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(50) NOT NULL,
email VARCHAR(256) UNIQUE NOT NULL,
password CHARACTER(60) NOT NULL,
confirm BOOLEAN NOT NULL,
token CHARACTER(15) UNIQUE,
last_payment DATE);`);
  await db.run(`CREATE TABLE IF NOT EXISTS url (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER FOREING KEY NOT NULL,
url TEXT NOT NULL,
short_url TEXT NOT NULL,
visitas INTEGER NOT NULL);`);
  db.close();
})();
