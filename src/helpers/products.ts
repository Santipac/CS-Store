import { nanoid } from "nanoid";

export const slugCreator = (name: string): string => {
  const slug =
    name.trim().replaceAll(" ", "_").replaceAll("'", "").replaceAll("|", "") +
    nanoid();
  return slug.toLocaleLowerCase();
};
