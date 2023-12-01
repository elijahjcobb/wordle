import { BoxState } from "@/components/solution";

function boxStateToColor(state: BoxState): string {
  switch (state) {
    case BoxState.CORRECT:
      return "g";
    case BoxState.INCORRECT:
      return "r";
    case BoxState.MISPLACED:
      return "y";
    case BoxState.EMPTY:
      return "e";
    default:
      return "x";
  }
}

function encodeState(state: BoxState[]): string {
  return state.map(boxStateToColor).join("");
}

export function generateSearchParams(score: number, state: BoxState[]): string {
  return `score=${score}&boxes=${encodeState(state)}`;
}

export function generateOGURL(score: number, state: BoxState[]): string {
  return `https://wordle.elijahcobb.app/og?${generateSearchParams(
    score,
    state
  )}`;
}

export function generateOGURLFromParams(params: string): string {
  return `https://wordle.elijahcobb.app/og?${params}`;
}

export function generateShareURL(score: number, state: BoxState[]): string {
  return `https://wordle.elijahcobb.app?${generateSearchParams(score, state)}`;
}
