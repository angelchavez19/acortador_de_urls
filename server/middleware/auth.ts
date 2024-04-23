import { decodeJWT } from "~/helpers/token";
import { getName } from "~/services/database";

export default defineEventHandler(async (event) => {
  let token = getHeader(event, "Authorization");

  if (!token) {
    event.context.auth = { auth: false };
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
    return;
  }

  event.context.auth = {
    auth: true,
    id: decodeToken.id,
    name: await getName(decodeToken.id),
  };
});
