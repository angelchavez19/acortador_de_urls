import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "~/config/app.config";

const sliceUuid = (start: number, end: number) =>
  uuidv4().replace(/-/g, "").slice(start, end);

export const getToken = () => sliceUuid(0, 15);

export const getTokenUrl = (max: number = 8) => sliceUuid(0, max);

export const getJWT = (payload: any) =>
  jwt.sign(
    { ...payload, iat: Math.floor(Date.now() / 1000) - 30 },
    SECRET_KEY,
    { algorithm: "HS256", expiresIn: 60 * 60 * 24 }
  );

export const decodeJWT = <T>(token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY, {
      algorithm: "HS256",
    }) as T;
  } catch {
    return {} as T;
  }
};
