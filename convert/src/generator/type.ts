import { TailwindConfig as Config } from "tailwindcss/tailwind-config";
//Ref: https://www.kirillvasiltsov.com/writing/type-check-tailwind-css/
const toUnionString = (s: string) => `"${s}"`;
export const generateType = (
  config: Config,
  classes: string[]
): string => `//generate type
type ValidClass = ${classes.map(toUnionString).join(" | ")};
export type TwClass<S> = S extends \`\${infer Class} \${infer Rest}\`
  ? Class extends ValidClass
    ? \`\${Class} \${Tailwind<Rest>}\`
    : never
  : S extends \`\${infer Class}\`
  ? Class extends ValidClass
    ? S
    : never
  : never;
`;
