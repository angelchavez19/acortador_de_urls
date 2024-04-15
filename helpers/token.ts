import { v4 as uuidv4 } from "uuid";

export const getToken = () => uuidv4().replace(/-/g, "").slice(0, 15);
