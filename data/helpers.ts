import { type BoxProps, BoxState } from "../components/solution";

export type Puzzle = BoxProps[][];

export function getWordleScore(puzzle: Puzzle): number {
  let s = 0;
  for (const line of puzzle) {
    if (line[0].state === BoxState.EMPTY) break;
    s++;
  }
  return s;
}

export function getWordleDay(): string {
  const today = new Date();
  const begin = new Date("6/19/2021");
  const diffMs = today.getTime() - begin.getTime();
  const dayCount = Math.floor(diffMs / 1000 / 60 / 60 / 24);
  return `${dayCount}`;
}
