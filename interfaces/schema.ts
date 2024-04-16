export interface SchemaType {
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    as?: string;
    autocomplete?: string;
    rules?: ((value: string) => true | string)[];
  }[];
  submitValue: string;
  messages: {
    message: string;
    href: string;
    text: string;
  }[];
}
