import { TailwindConfig as Config } from "tailwindcss/tailwind-config";
import { generateClass } from "./generator/class";
import { generateType } from "./generator/type";
export const getFile = (config: Config) => (
  classes: string[]
): string => `// http://github.com/dvkndn/typed-tailwind
${generateClass(config, classes)}
${generateType(config, classes)}`;
