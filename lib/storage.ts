import { getWordleDay, getWordleScore, type Puzzle } from "./helpers";

export function saveGame(puzzle: Puzzle, solution: string): void {
  const today = getWordleDay();
  if (today === localStorage.getItem("today")) return;

  localStorage.setItem("puzzle", JSON.stringify(puzzle));
  localStorage.setItem("today", today);

  const history = JSON.parse(localStorage.getItem("history") ?? "{}");
  history[today] = getWordleScore(puzzle);
  localStorage.setItem("history", JSON.stringify(history));
}
