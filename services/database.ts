import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { encrypt } from "~/helpers/bcrypt";

const opendb = async () => {
  return await open({
    filename: "db.db",
    driver: sqlite3.Database,
  });
};

export const isUnique = async (field: string, value: string) => {
  const db = await opendb();
  const res = await db.get(`SELECT id FROM user WHERE ${field}=?;`, [value]);
  db.close();
  return !Boolean(res);
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

export const confirmUser = async (token: string) => {
  const db = await opendb();
  const { changes } = await db.run(
    `UPDATE user SET confirm=1, token='' WHERE token=?`,
    [token]
  );
  db.close();
  return Boolean(changes);
};
