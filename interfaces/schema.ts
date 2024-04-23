export interface SchemaType {
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    as?: string;
    autocomplete?: string;
    rules?: ((value: string) => true | string)[];
    link?: {
      text: string;
      href: string;
    };
  }[];
  submitValue: string;
  messages: {
    message: string;
    href: string;
    text: string;
  }[];
}

export interface ContentSchema {
  title: string;
  pricing: string;
  card: {
    value: string;
    message?: string;
  }[];
  start: string;
  to: string;
}

export interface IndexContentPlans {
  en: ContentSchema[];
  es: ContentSchema[];
}

export interface UrlSchema {
  id: number;
  url: string;
  short_url: string;
  visits: number;
}
