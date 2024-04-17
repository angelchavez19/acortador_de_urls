import { visitUrl } from "~/services/database";

export default defineEventHandler(async (event) => {
  let url = getRouterParam(event, "url");

  if (!url) {
    sendRedirect(event, "/e?status=404", 301);
    return;
  }

  const res = await visitUrl(url);

  if (!res) {
    sendRedirect(event, "/e?status=404", 301);
    return;
  }

  sendRedirect(event, res, 301);
  return;
});
