import type { IndexContentPlans } from "~/interfaces/schema";

export const indexEN = {
  headerAria: "Go to the home page",
  headerLogin: "Log In",
  titleSection: "Find the Best Plan for You",
};

export const indexES = {
  headerAria: "Ir a la página principal",
  headerLogin: "Iniciar Sesión",
  titleSection: "Busca el Mejor Plan Para Ti",
};

export const indexPlans: IndexContentPlans = {
  en: [
    {
      title: "Occasional",
      pricing: "$0",
      card: [
        { value: "URLs with a maximum of 30 uses" },
        { value: "8-character length" },
      ],
      start: "Start now",
      to: "/#occasional",
    },
    {
      title: "Pro",
      pricing: "$5 per month",
      card: [
        { value: "Unlimited use URLs" },
        { value: "Custom URLs", message: "Only if not in use" },
        { value: "URL management" },
        { value: "Generate QR codes" },
      ],
      start: "Start now",
      to: "/register",
    },
  ],
  es: [
    {
      title: "Ocasional",
      pricing: "$0",
      card: [
        { value: "URLs de 30 usos máximo" },
        { value: "Longitud de 8 caracteres" },
      ],
      start: "Empieza ahora",
      to: "/#occasional",
    },
    {
      title: "Pro",
      pricing: "$5 por mes",
      card: [
        { value: "URLs sin límite de uso" },
        {
          value: "Personalización de URLs",
          message: "Solo si no está en uso",
        },
        { value: "Gestión de URLs" },
        { value: "Genera codigos QR" },
      ],
      start: "Empieza ahora",
      to: "/register",
    },
  ],
};
