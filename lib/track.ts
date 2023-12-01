import { track as _track } from "@vercel/analytics";

const events = [
  "playing_guess_incorrect",
  "playing_guess_dne",
  "playing_loss",
  "playing_win",
  "share",
  "info",
] as const;

export function track(name: (typeof events)[number]) {
  return _track(name);
}
