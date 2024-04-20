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
  try {
    const res = await db.get(`SELECT id FROM ${table} WHERE ${field}=?;`, [
      value,
    ]);
    await db.close();
    return !Boolean(res);
  } catch {
    await db.close();
    return true;
  }
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
    `UPDATE user SET confirm=1, token=NULL WHERE token=?`,
    [token]
  );
  await db.close();
  return Boolean(changes);
};

export const verifyUser = async (email: string, password: string) => {
  const db = await opendb();
  try {
    const user = await db.get(
      `SELECT id, password, confirm FROM user WHERE email=?`,
      [email]
    );
    await db.close();
    if (!user || !user.confirm) return [undefined, false];
    return [user.id, await compareCrypt(password, user.password)];
  } catch {
    await db.close();
    return [undefined, false];
  }
};

export const getUserState = async (id: number) => {
  const db = await opendb();
  try {
    const { last_payment } = await db.get(
      `SELECT last_payment FROM user WHERE id=?`,
      [id]
    );
    await db.close();

    if (!last_payment) return "new-user";

    let date = new Date(last_payment);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() + 1);

    let today = new Date();
    if (today.getTime() > date.getTime()) return "not-paid";
    return "paid";
  } catch {
    await db.close();
    return false;
  }
};

export const insertUrl = async (url: string, short_url: string) => {
  const db = await opendb();
  await db.run(`INSERT INTO url (url, short_url, visits) VALUES (?, ?, ?);`, [
    url,
    short_url,
    0,
  ]);
  await db.close();
};

export const visitUrl = async (short_url: string) => {
  const db = await opendb();
  try {
    const res = await db.get(
      `SELECT id, url, visits FROM url WHERE short_url=?;`,
      [short_url]
    );
    if (res.visits > 30) await db.run(`DELETE FROM url WHERE id=?;`, [res.id]);
    else await db.run(`UPDATE url SET visits=visits+1 WHERE id=?;`, [res.id]);
    await db.close();
    return res.url;
  } catch {
    await db.close();
    return false;
  }
};

export const getUrlsPremium = async (id: number, fields: string) => {
  const db = await opendb();
  const urls = await db.all(
    `SELECT ${fields} FROM url_premium WHERE user_id=?`,
    [id]
  );
  await db.close();
  if (!urls) return [];
  return urls;
};

export const payPremium = async (id: number) => {
  const db = await opendb();
  try {
    const { last_payment } = await db.get(
      `SELECT last_payment FROM user WHERE id=?;`,
      [id]
    );

    let date = new Date(last_payment);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() + 1);

    let today = new Date();

    if (today.getTime() > date.getTime()) {
      await db.run(`UPDATE user SET last_payment=? WHERE id=?`, [
        today.toISOString().split("T")[0],
        id,
      ]);
      await db.close();
      return true;
    }

    await db.close();
    return false;
  } catch {
    await db.close();
    return false;
  }
};

export const insertUrlPremium = async (
  id: number,
  url: string,
  short_url: string
) => {
  const db = await opendb();
  await db.run(
    `INSERT INTO url_premium (user_id, url, short_url, visits) VALUES (?, ?, ?, ?);`,
    [id, url, short_url, 0]
  );
  await db.close();
};

export const visitUrlPremium = async (short_url: string) => {
  const db = await opendb();
  try {
    const res = await db.get(
      `SELECT id, url FROM url_premium WHERE short_url=?;`,
      [short_url]
    );
    await db.run(`UPDATE url_premium SET visits=visits+1 WHERE id=?;`, [
      res.id,
    ]);
    await db.close();
    return res.url;
  } catch {
    await db.close();
    return false;
  }
};

export const deleteURLPremium = async (id: number) => {
  const db = await opendb();
  await db.run(`DELETE FROM url_premium WHERE id=?;`, [id]);
  await db.close();
};
