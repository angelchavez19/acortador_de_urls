import { getTokenUrl } from "~/helpers/token";
import { isUnique } from "~/services/database";

const getToken = () => {
  let shortUrl = getTokenUrl(6);
  let count = 0;
  while (!isUnique("short_url", shortUrl, "url_premium")) {
    shortUrl = getTokenUrl(6);
    count++;
    if (count > 10) return "";
  }
  return shortUrl;
};

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) {
    setResponseStatus(event, 401);
    return auth;
  }

  let shortUrl = getToken();

  if (!shortUrl) {
    setResponseStatus(event, 507);
    return auth;
  }

  return {
    auth: auth.auth,
    shortUrl: shortUrl,
  };
});
