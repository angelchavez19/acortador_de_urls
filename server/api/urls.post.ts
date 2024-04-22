import { string } from "yup";
import { SERVER } from "~/config/app.config";
import { getTokenUrl } from "~/helpers/token";
import { isUnique, insertUrl } from "~/services/database";

const getToken = () => {
  let shortUrl = getTokenUrl();
  let count = 0;
  while (!isUnique({ short_url: shortUrl }, "url")) {
    shortUrl = getTokenUrl();
    count++;
    if (count > 5) return "";
  }
  return shortUrl;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await string().url().validate(body.url);
  } catch {
    setResponseStatus(event, 400);
    return {};
  }

  let shortUrl = getToken();

  if (!shortUrl) {
    setResponseStatus(event, 507);
    return;
  }

  await insertUrl(body.url, shortUrl);

  return { shortUrl: `${SERVER}u/${shortUrl}` };
});
