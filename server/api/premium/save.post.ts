import {
  getUrlsPremium,
  insertUrlPremium,
  isUnique,
} from "~/services/database";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) {
    setResponseStatus(event, 401);
    return auth;
  }

  const body = await readBody(event);
  const url = body.url;
  const shortUrl = body.short_url;

  if (!url || !shortUrl) return { auth: auth.auth };
  if (!(await isUnique("short_url", shortUrl, "url_premium")))
    return { auth: auth.auth };

  await insertUrlPremium(auth.id, url, shortUrl);
  const urls = await getUrlsPremium(auth.id, "id, url, short_url, visits");

  return { auth: auth.auth, urls };
});
