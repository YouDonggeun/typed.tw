import postcss from "postcss";
import tailwindcss from "tailwindcss";

//@ts-ignore
import tailwindCssPlugin from "tailwindcss/lib/index.postcss7";
import { withSafeSeparator, restoreSeparator } from "./separator";
import { getConfig } from "./config";
import { getSelectors } from "./selectors";
import { getClasses } from "./classes";
import { getFile } from "./file";

/**
 * Convert a config file to its TS source
 *
 * @param configStr - content of a tailwind.config.js
 * @returns TypeScript source to the classes
 */
export const getSource = (configStr: string) => {
  return new Promise<string>((resolve, reject) => {
    const config = getConfig(configStr);
    if (typeof config === "string") {
      return reject(config);
    }
    const tailwindCss = tailwindCssPlugin(withSafeSeparator(config));
    postcss(tailwindCss)
      .process("@tailwind utilities;", { from: undefined })
      .then(getSelectors)
      .then(getClasses)
      .then(restoreSeparator(config))
      .then(getFile(config))
      .then(resolve)
      .catch(reject);
  });
};
