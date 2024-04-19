import { payPremium } from "~/services/database";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) return auth;

  const res = await payPremium(auth.id);
  console.log(res);

  if (!res) setResponseStatus(event, 409);

  return {
    auth: auth.auth,
    pay: res,
  };
});
