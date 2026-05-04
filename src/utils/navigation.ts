import type { Href } from "expo-router";

export function hx(path: string): Href {
  return path as unknown as Href;
}
