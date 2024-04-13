type messageValue =
  | "required"
  | "email"
  | "uppercase"
  | "lowercase"
  | "number"
  | "symbol"
  | "length12";

const messages = {
  en: {
    required: "This field is required",
    email: "This field must be a valid email",
    uppercase: "This field must contain at least one uppercase letter",
    lowercase: "This field must contain at least one lowercase letter",
    number: "This field must contain at least one number",
    symbol: "This field must contain at least one symbol: !#$%&/",
    length12: "This field must have at least 12 characters",
  },
  es: {
    required: "Este campo es requerido",
    email: "Este campo debe ser un correo electrónico válido",
    uppercase: "Este campo debe contener al menos una mayuscula",
    lowercase: "Este campo debe contener al menos una minuscula",
    number: "Este campo debe contener al menos un número",
    symbol: "Este campo debe contener al menos un simbolo: !#$%&/",
    length12: "Este campo debe tener como mínimo 12 caracteres",
  },
};

export const getTranslate = (localeValue: string, message: messageValue) => {
  if (localeValue === "en") return messages.en[message];
  if (localeValue === "es") return messages.es[message];
  return "Error";
};
