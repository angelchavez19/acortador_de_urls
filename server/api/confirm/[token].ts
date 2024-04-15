import { confirmUser } from "~/services/database";

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");

  if (!token) return { confirmed: false };
  return { confirmed: await confirmUser(token) };
});
