import { getUrlsPremium, getUserState } from "~/services/database";

export default defineEventHandler(async (event) => {
  const auth = event.context.auth;
  if (!auth.auth) {
    setResponseStatus(event, 401);
    return auth;
  }

  const id = auth.id;
  const userState = await getUserState(id);
  let urls: any[] = [];

  if (userState !== "new-user") urls = await getUrlsPremium(id);

  return {
    auth: true,
    state: userState,
    urls,
  };
});
