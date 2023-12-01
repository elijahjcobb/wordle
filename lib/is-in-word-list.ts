import { five_char_words } from "./word-list";

export function isInWordList(value: string): boolean {
  return five_char_words.includes(value.toLowerCase());
}
