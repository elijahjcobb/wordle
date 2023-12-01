import { WORD_LIST } from "./word-list";

export function isInWordList(value: string): boolean {
  return WORD_LIST.includes(value.toLowerCase());
}
