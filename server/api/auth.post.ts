import { decodeJWT } from "~/helpers/token";

export default defineEventHandler(async (event) => {
  let token = getHeader(event, "Authorization");
  if (!token) return { auth: false };
  token = token.slice(7);

  const decodeToken = decodeJWT<{
    id: number;
    iat: number;
    exp: number;
  }>(token);

  if (
    !decodeToken ||
    !decodeToken.exp ||
    !decodeToken.iat ||
    decodeToken.exp < Math.floor(Date.now() / 1000)
  )
    return { auth: false };

  return { auth: true };
});
