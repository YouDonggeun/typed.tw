import camelcase from "camelcase";
import { Config } from "tailwindcss-won";
import { generateClass } from "./generator/class";
import { generateType } from "./generator/type";
export const getFile = (config: Config) => (
  classes: string[]
): string => `// http://github.com/dvkndn/typed-tailwind
${generateClass(config, classes)}
${generateType(config, classes)}`;
