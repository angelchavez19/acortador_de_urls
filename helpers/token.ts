import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const getToken = () => uuidv4().replace(/-/g, "").slice(0, 15);

export const getJWT = (payload: any) =>
  jwt.sign(
    { ...payload, iat: Math.floor(Date.now() / 1000) - 30 },
    process.env.SECRET_KEY,
    { algorithm: "HS256", expiresIn: 60 * 60 * 24 }
  );

export const decodeJWT = <T>(token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY, {
      algorithm: "HS256",
    }) as T;
  } catch {
    return {} as T;
  }
};
