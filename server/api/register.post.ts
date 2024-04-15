import { UserCreate } from "~/interfaces/user";
import { sendMail } from "~/helpers/mail";
import { required, isEmail, isPassword } from "~/helpers/validators";
import { getToken } from "~/helpers/token";
import { isUnique, insertUser } from "~/services/database";

export default defineEventHandler(async (event) => {
  const user: UserCreate = await readBody(event);

  if (
    !required(user.name) ||
    !isEmail(user.email) ||
    !isPassword(user.password)
  ) {
    setResponseStatus(event, 400);
    return;
  }

  if (!(await isUnique("email", user.email))) {
    setResponseStatus(event, 409);
    return;
  }

  let token = getToken();
  while (!(await isUnique("token", token))) token = getToken();

  const href = `${process.env.SERVER}confirm/${token}`;
  insertUser(user.name, user.email, user.password, token);
  await sendMail(
    user.email,
    "Verify email | Confirmar Contraseña",
    `<p>Confirm your <a href="${href}">email</a></p>
    
    ---

    <p>Confirma tu <a href="${href}">correo</a></p>
    `
  );
  setResponseStatus(event, 200);
});
