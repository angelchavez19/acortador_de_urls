import { type UserLogin } from "~/interfaces/user";
import { verifyUser } from "~/services/database";
import { getJWT } from "~/helpers/token";

export default defineEventHandler(async (event) => {
  const user: UserLogin = await readBody(event);
  const [id, verify] = await verifyUser(user.email, user.password);
  if (!id || !verify) {
    setResponseStatus(event, 404);
    return;
  }
  return { token: getJWT({ id }) };
});
