import { cacheLife } from "next/cache";

/**
 * Reading the clock during render is a dynamic API under Cache Components,
 * so the copyright year is cached with a daily lifetime instead.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
