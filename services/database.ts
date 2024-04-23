import { encrypt, compareCrypt } from "~/helpers/bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";
import type { StateUser } from "~/types/user";
import { SERVER } from "~/config/app.config";

const prisma = new PrismaClient();

export async function isUnique(
  where: Prisma.UserWhereUniqueInput,
  table: "user"
): Promise<boolean>;
export async function isUnique(
  where: Prisma.UrlWhereUniqueInput,
  table: "url"
): Promise<boolean>;
export async function isUnique(
  where: Prisma.UrlPremiumWhereUniqueInput,
  table: "urlPremium"
): Promise<boolean>;
export async function isUnique(where: object, table: string): Promise<boolean> {
  let res = null;

  if (table === "user")
    res = await prisma.user.findUnique({ where, select: { id: true } });
  else if (table === "url")
    res = await prisma.url.findUnique({ where, select: { id: true } });
  else if (table === "urlPremium")
    res = await prisma.urlPremium.findUnique({ where, select: { id: true } });

  return !Boolean(res);
}

export const insertUser = async (
  name: string,
  email: string,
  password: string,
  token: string
): Promise<void> => {
  const hashPassword = await encrypt(password);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      confirm: false,
      token,
    },
  });
};

export const confirmUser = async (token: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { token },
    select: { confirm: true },
  });

  if (!user || user.confirm) return false;

  const res = await prisma.user.update({
    where: { token },
    data: { confirm: true, token: null },
  });
  return Boolean(res);
};

export const verifyUser = async (
  email: string,
  password: string
): Promise<(boolean | undefined)[] | (number | boolean)[]> => {
  const user: { id: number; password: string; confirm: boolean } | null =
    await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, confirm: true },
    });

  if (!user || !user.confirm) return [undefined, false];
  return [user.id, await compareCrypt(password, user.password)];
};

export const getUserState = async (id: number): Promise<false | StateUser> => {
  const user: { last_payment: Date | null } | null =
    await prisma.user.findUnique({
      where: { id },
      select: { last_payment: true },
    });
  if (!user) return false;
  if (!user.last_payment) return "new-user";

  let today = new Date();
  let date = user.last_payment;
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() + 1);

  if (today.getTime() > date.getTime()) return "not-paid";
  return "paid";
};

export const resetPassword = async (
  email: string,
  token: string
): Promise<true | "unregistered" | "unconfirmed"> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { confirm: true },
  });

  if (!user) return "unregistered";
  if (!user.confirm) return "unconfirmed";

  await prisma.user.update({ where: { email }, data: { token } });
  return true;
};

export const changePassword = async (token: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { token },
    select: { confirm: true },
  });

  if (!user || !user.confirm) return false;

  const res = await prisma.user.update({
    where: { token },
    data: { token: null, password: await encrypt(password) },
  });
  return Boolean(res);
};

export const insertUrl = async (
  url: string,
  short_url: string
): Promise<void> => {
  await prisma.url.create({ data: { url, short_url, visits: 0 } });
};

export const visitUrl = async (short_url: string): Promise<false | string> => {
  const res: { id: number; url: string; visits: number } | null =
    await prisma.url.findUnique({
      where: { short_url },
      select: { id: true, url: true, visits: true },
    });
  if (!res) return false;

  if (res.visits > 30) await prisma.url.delete({ where: { id: res.id } });
  else
    await prisma.url.update({
      where: { id: res.id },
      data: { visits: res.visits + 1 },
    });
  return res.url;
};

export const getUrlsPremium = async (
  id: number
): Promise<
  {
    id: number;
    url: string;
    short_url: string;
    visits: number;
  }[]
> => {
  let urls = await prisma.urlPremium.findMany({
    where: { userId: id },
    select: {
      id: true,
      url: true,
      short_url: true,
      visits: true,
    },
  });
  urls.forEach((url) => {
    url.short_url = `${SERVER}p/${url.short_url}`;
  });
  return urls;
};

export const payPremium = async (id: number): Promise<boolean> => {
  const user: { last_payment: Date | null } | null =
    await prisma.user.findUnique({
      where: { id },
      select: { last_payment: true },
    });

  if (!user) return false;

  let today = new Date();

  if (!user.last_payment) {
    await prisma.user.update({
      where: { id },
      data: { last_payment: today },
    });
    return true;
  }

  let date = user.last_payment;
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() + 1);

  if (today.getTime() > date.getTime()) {
    console.log(2);
    await prisma.user.update({
      where: { id },
      data: { last_payment: today },
    });
    return true;
  }
  return false;
};

export const insertUrlPremium = async (
  id: number,
  url: string,
  short_url: string
): Promise<void> => {
  await prisma.urlPremium.create({
    data: {
      userId: id,
      url,
      short_url,
      visits: 0,
    },
  });
};

export const visitUrlPremium = async (
  short_url: string
): Promise<false | string> => {
  const url: { id: number; url: string; visits: number } | null =
    await prisma.urlPremium.findUnique({
      where: { short_url },
      select: { id: true, url: true, visits: true },
    });

  if (!url) return false;

  await prisma.urlPremium.update({
    where: { id: url.id },
    data: { visits: url.visits + 1 },
  });

  return url.url;
};

export const deleteURLPremium = async (id: number): Promise<void> => {
  await prisma.urlPremium.delete({ where: { id } });
};
