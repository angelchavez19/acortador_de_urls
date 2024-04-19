import { decodeJWT } from "~/helpers/token";

export default defineEventHandler((event) => {
  let token = getHeader(event, "Authorization");

  if (!token) {
    event.context.auth = { auth: false };
    setResponseStatus(event, 401);
    return;
  }

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
  ) {
    event.context.auth = { auth: false };
    setResponseStatus(event, 401);
    return;
  }

  event.context.auth = { auth: true, id: decodeToken.id };
});
