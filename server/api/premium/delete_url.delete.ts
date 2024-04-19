import { deleteURLPremium, getUrlsPremium } from "~/services/database";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) {
    setResponseStatus(event, 401);
    return auth;
  }

  const body = (await readBody(event)) || {};
  if (!body.id)
    return {
      auth: auth.auth,
      deleted: false,
    };

  await deleteURLPremium(body.id);
  const urls = await getUrlsPremium(auth.id, "id, url, short_url, visits");

  return {
    auth: auth.auth,
    deleted: true,
    urls,
  };
});
