import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { encrypt, compareCrypt } from "~/helpers/bcrypt";

const opendb = async () => {
  return await open({
    filename: "db.db",
    driver: sqlite3.Database,
  });
};

export const isUnique = async (
  field: string,
  value: string,
  table: string = "user"
) => {
  const db = await opendb();
  const res = await db.get(`SELECT id FROM ${table} WHERE ${field}=?;`, [
    value,
  ]);
  await db.close();
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
  await db.run(
    `INSERT INTO user (name, email, password, confirm, token) VALUES (?, ?, ?, ?, ?);`,
    [name, email, hashPassword, 0, token]
  );
  await db.close();
};

export const confirmUser = async (token: string) => {
  const db = await opendb();
  const { changes } = await db.run(
    `UPDATE user SET confirm=1, token='' WHERE token=?`,
    [token]
  );
  await db.close();
  return Boolean(changes);
};

export const verifyUser = async (email: string, password: string) => {
  const db = await opendb();
  const user = await db.get(`SELECT id, password FROM user WHERE email=?`, [
    email,
  ]);
  await db.close();
  if (!user) return [undefined, false];
  return [user.id, await compareCrypt(password, user.password)];
};

export const insertUrl = async (
  user_id: number,
  url: string,
  short_url: string
) => {
  const db = await opendb();
  await db.run(
    `INSERT INTO url (user_id, url, short_url, visits) VALUES (?, ?, ?, ?);`,
    [user_id, url, short_url, 0]
  );
  await db.close();
};

export const visitUrl = async (short_url: string) => {
  const db = await opendb();
  try {
    const res = await db.get(
      `SELECT id, url, visits FROM url WHERE short_url=?;`,
      [short_url]
    );
    if (res.visits > 10) await db.run(`DELETE FROM url WHERE id=?;`, [res.id]);
    else await db.run(`UPDATE url SET visits=visits+1 WHERE id=?;`, [res.id]);
    await db.close();
    return res.url;
  } catch {
    await db.close();
    return false;
  }
};
