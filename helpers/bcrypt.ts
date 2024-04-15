import bcrypt from "bcrypt";

export const encrypt = async (plain: string) => {
  return await bcrypt.hash(plain, 10);
};

export const compareCrypt = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};
