import { visitUrlPremium } from "~/services/database";

export default defineEventHandler(async (event) => {
  let url = getRouterParam(event, "url");

  if (!url) {
    sendRedirect(event, "/e?status=404", 301);
    return;
  }

  const res = await visitUrlPremium(url);

  if (!res) {
    sendRedirect(event, "/e?status=404", 301);
    return;
  }

  setHeader(event, "Cache-Control", "no-cache");
  sendRedirect(event, res, 301);
  return;
});
