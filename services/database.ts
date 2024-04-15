import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { encrypt } from "~/helpers/bcrypt";

const opendb = async () => {
  return await open({
    filename: "db.db",
    driver: sqlite3.Database,
  });
};

export const isUniqueEmail = async (email: string) => {
  const db = await opendb();
  const res = await db.get(`SELECT email FROM user WHERE email=?;`, [email]);
  db.close();
  if (res) return false;
  return true;
};

export const insertUser = async (
  name: string,
  email: string,
  password: string,
  token: string
) => {
  const db = await opendb();
  const hashPassword = await encrypt(password);
  db.run(
    `INSERT INTO user (name, email, password, confirm, token) VALUES (?, ?, ?, ?, ?);`,
    [name, email, hashPassword, 0, token]
  );
  db.close();
};
