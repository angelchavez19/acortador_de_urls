type messageValue =
  | "required"
  | "email"
  | "uppercase"
  | "lowercase"
  | "number"
  | "symbol"
  | "length12"
  | "maxlength"
  | "invalidShortURL";

const messages = {
  en: {
    required: "This field is required",
    email: "This field must be a valid email",
    uppercase: "This field must contain at least one uppercase letter",
    lowercase: "This field must contain at least one lowercase letter",
    number: "This field must contain at least one number",
    symbol: "This field must contain at least one symbol: !#$%&/",
    length12: "This field must have at least 12 characters",
    maxlength: (max: number) =>
      `This field must be less than ${max} characters`,
    invalidShortURL: "The short URL is invalid",
  },
  es: {
    required: "Este campo es requerido",
    email: "Este campo debe ser un correo electrónico válido",
    uppercase: "Este campo debe contener al menos una mayuscula",
    lowercase: "Este campo debe contener al menos una minuscula",
    number: "Este campo debe contener al menos un número",
    symbol: "Este campo debe contener al menos un simbolo: !#$%&/",
    length12: "Este campo debe tener como mínimo 12 caracteres",
    maxlength: (max: number): string =>
      `Este campo debe contener menos de ${max} caracteres`,
    invalidShortURL: "La URL corta es invalida",
  },
};

export const getTranslate = (
  localeValue: string,
  message: messageValue,
  params: any[] = []
) => {
  let translate: any = null;
  if (localeValue === "en") translate = messages.en[message];
  else if (localeValue === "es") translate = messages.es[message];
  else translate = "Error";

  if (typeof translate === "string") return translate;
  else return translate(...params);
};
