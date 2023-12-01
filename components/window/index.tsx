import { useEffect, useMemo } from "react";
import { getWordleDay, getWordleScore } from "../../lib/helpers";
import { saveGame } from "../../lib/storage";
import { BoxProps, BoxState, Solution } from "../solution";
import { History } from "./history";
import styles from "./index.module.css";
import { generateShareURL } from "@/lib/generate-og-url";

export interface WindowProps {
	puzzle: BoxProps[][];
	solution: string;
	setToast: (msg: string) => void;
}

export function Window({ puzzle, solution, setToast }: WindowProps) {

	const score = useMemo(() => getWordleScore(puzzle), [puzzle]);

	const message = useMemo<string>(() => {
		const isFailed = puzzle[5][0].state === BoxState.INCORRECT;
		return generateShareURL(isFailed ? -1 : score, puzzle.flat().map(v => v.state));
		// const lines: string[] = [];
		// lines.push(`Wordle ${day} ${score}/6`);
		// lines.push('');
		// for (const puzzleLine of puzzle) {
		// 	if (puzzleLine[0].state === BoxState.EMPTY) break;
		// 	const newLine: string[] = [];
		// 	for (const puzzleItemOf of puzzleLine) {
		// 		switch (puzzleItemOf.state) {
		// 			case BoxState.CORRECT:
		// 				newLine.push("🟩");
		// 				break;
		// 			case BoxState.INCORRECT:
		// 				newLine.push("⬜");
		// 				break;
		// 			case BoxState.MISPLACED:
		// 				newLine.push("🟨");
		// 				break;

		// 		}
		// 	}
		// 	lines.push(newLine.join(""));
		// }
		// lines.push("\nhttps://wordle.elijahcobb.app");
		// return lines.join("\n");
	}, [puzzle, score]);

	useEffect(() => {
		saveGame(puzzle, solution);
	}, [puzzle, solution]);

	return <div className={styles.container}>
		<span className={styles.solution}>{solution}</span>
		<div className={styles.solutionContainer}>
			<Solution
				puzzle={puzzle}
				index={0}
				row={-1}
			/>
		</div>
		<History />
		<div className={styles.spacer} />
		<div className={styles.buttons}>
			<button className={styles.reset} onClick={() => {
				window.open("/", "_self")
			}}>Done</button>
			<button className={styles.share} onClick={() => {
				setToast("Copied to Clipboard");
				navigator.clipboard.writeText(message);
			}}>Share</button>
		</div>
	</div>
}