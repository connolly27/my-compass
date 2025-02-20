import { clsx, type ClassValue } from "clsx"; // clsx is a utility for constructing className strings
import { twMerge } from "tailwind-merge"; // twMerge intelligently handles Tailwind class conflicts

// cn (stands for "classnames") combines clsx and twMerge to handle className logic
// It takes any number of className arguments (strings, objects, arrays, etc.)
export function cn(...inputs: ClassValue[]) {
  // 1. clsx combines the inputs into a single className string
  // 2. twMerge resolves any Tailwind CSS conflicts
  // 3. Returns the final, optimized className string
  return twMerge(clsx(inputs));
}
