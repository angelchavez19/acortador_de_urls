import { SERVER } from "~/config/app.config";
import { sendMail } from "~/helpers/mail";
import { getToken } from "~/helpers/token";
import { UserReset } from "~/interfaces/user";
import { isUnique, resetPassword } from "~/services/database";

export default defineEventHandler(async (event) => {
  const body: UserReset = await readBody(event);

  let token = getToken();
  while (!(await isUnique({ token }, "user"))) token = getToken();

  const res = await resetPassword(body.email, token);

  if (res === "unregistered") {
    setResponseStatus(event, 404);
  } else if (res === "unconfirmed") {
    setResponseStatus(event, 409);
  } else {
    const href = `${SERVER}confirm-reset/${token}`;
    await sendMail(
      body.email,
      "Reset Password | Reestablecer Contraseña",
      `<p>Reset your <a href="${href}">password</a>.</p>

      ---

      <p>Reestablece tu <a href="${href}">contraseña</a>.</p>`
    );
  }
});
