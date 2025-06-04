import { twMerge } from "tailwind-merge";

export function cx(
  className: string,
  ...args: Array<string | undefined | false | null>
) {
  return twMerge(className, ...args);
}
