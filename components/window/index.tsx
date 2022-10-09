import { useEffect, useMemo } from "react";
import { getWordleDay, getWordleScore } from "../../data/helpers";
import { saveGame } from "../../data/storage";
import { GameState } from "../page"
import { BoxProps, BoxState, Solution } from "../solution";
import styles from "./index.module.css";

export interface WindowProps {
	puzzle: BoxProps[][];
	solution: string;
}

export function Window({ puzzle, solution }: WindowProps) {

	const score = useMemo(() => getWordleScore(puzzle), [puzzle]);
	const day = useMemo(() => getWordleDay(), []);

	const message = useMemo<string>(() => {
		const lines: string[] = [];
		lines.push(`Wordle ${day} ${score}/6`);
		lines.push('');
		for (const puzzleLine of puzzle) {
			if (puzzleLine[0].state === BoxState.EMPTY) break;
			const newLine: string[] = [];
			for (const puzzleItemOf of puzzleLine) {
				switch (puzzleItemOf.state) {
					case BoxState.CORRECT:
						newLine.push("🟩");
						break;
					case BoxState.INCORRECT:
						newLine.push("⬜");
						break;
					case BoxState.MISPLACED:
						newLine.push("🟨");
						break;

				}
			}
			lines.push(newLine.join(""));
		}
		lines.push("\nhttps://wordle.elijahcobb.app");
		return lines.join("\n");
	}, [puzzle, score, day]);

	useEffect(() => {
		saveGame(puzzle, solution);
	}, [puzzle, solution]);

	return <div className={styles.container}>
		<div className={styles.solution}>
			<span>{solution}</span>
		</div>
		<div className={styles.solutionContainer}>
			<Solution
				puzzle={puzzle}
				index={0}
				row={-1}
			/>
		</div>
		<div className={styles.spacer} />
		<div className={styles.buttons}>
			<button className={styles.reset} onClick={() => {
				window.open("/", "_self")
			}}>Done</button>
			<button className={styles.share} onClick={() => {
				navigator.clipboard.writeText(message);
			}}>Share</button>
		</div>
	</div>
}