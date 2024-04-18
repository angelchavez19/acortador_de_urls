import { string } from "yup";
import { getTokenUrl } from "~/helpers/token";
import { isUnique, insertUrl } from "~/services/database";

const getToken = () => {
  let shortUrl = getTokenUrl();
  let count = 0;
  while (!isUnique("short_url", "shortUrl", "url")) {
    shortUrl = getTokenUrl();
    count++;
    if (count > 10) return "";
  }
  return shortUrl;
};

export default defineEventHandler(async (event) => {
  const response = await readBody(event);

  try {
    await string().url().validate(response.url);
  } catch {
    setResponseStatus(event, 400);
    return {};
  }

  let shortUrl = getToken();

  if (!shortUrl) {
    setResponseStatus(event, 507);
    return;
  }

  await insertUrl(response.url, shortUrl);

  return { shortUrl: `${process.env.SERVER}u/${shortUrl}` };
});
