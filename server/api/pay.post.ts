import { payPremium } from "~/services/database";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) {
    setResponseStatus(event, 401);
    return auth;
  }

  const res = await payPremium(auth.id);

  if (!res) setResponseStatus(event, 409);

  return {
    auth: auth.auth,
    pay: res,
  };
});
