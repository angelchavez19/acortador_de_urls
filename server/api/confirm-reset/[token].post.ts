import { UserConfirmReset } from "~/interfaces/user";
import { changePassword } from "~/services/database";

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");
  const body: UserConfirmReset = await readBody(event);

  if (!token || !body || !body.password) return { confirmed: false };
  return { confirmed: await changePassword(token, body.password) };
});
