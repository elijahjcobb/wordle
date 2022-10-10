
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { getWordleDay } from "../../data/helpers";
import { Keyboard } from "../keyboard";
import { Nav } from "../nav";
import { type BoxProps, Solution, BoxState } from "../solution";
import { Toast } from "../toast";
import { Window } from "../window";
import styles from "./index.module.css";

export interface PageProps {
	solution: string;
	words: string[]
}

function getEmptyRow(state = BoxState.EMPTY): BoxProps[] {
	return new Array(5).fill({ ...{ char: '', state } })
}

const DEFAULT_PUZZLE: BoxProps[][] = new Array(6).fill(getEmptyRow());

function occurrenceOfLetterInWord(letter: string, word: string): number {
	let count = 0;
	for (const l of word) if (l === letter) count++;
	return count;
}

function getWordFromRow(row: BoxProps[]): string {
	let word = '';
	for (const box of row) word += box.char;
	return word;
}

function computeNewStateForRow(row: BoxProps[], solution: string): BoxProps[] {
	const newRow = [...row];
	let usedLetter = new Map<string, number>();
	for (let i = 0; i < newRow.length; i++) {
		const newBox = { ...newRow[i] };
		const guess = newBox.char;
		usedLetter.set(guess, (usedLetter.get(guess) ?? 0) + 1);
		const answer = solution.charAt(i);
		if (guess === answer) newBox.state = BoxState.CORRECT;
		else if (solution.indexOf(guess) !== -1) {
			const count = usedLetter.get(guess) ?? 0;
			if (count > occurrenceOfLetterInWord(guess, solution)) newBox.state = BoxState.INCORRECT
			else newBox.state = BoxState.MISPLACED;
		}
		else newBox.state = BoxState.INCORRECT;
		newRow[i] = newBox;
	}
	return newRow;
}

export enum GameState {
	PLAYING,
	DONE,
}


export function Page({ solution, words }: PageProps) {

	const [puzzle, setPuzzle] = useState<BoxProps[][]>(DEFAULT_PUZZLE);
	const [index, setIndex] = useState(0);
	const [row, setRow] = useState(0);
	const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
	const [toast, setToast] = useState<string | undefined>(undefined);

	useEffect(() => {
		const today = getWordleDay();
		if (localStorage.getItem("today") === today) {
			setPuzzle(JSON.parse(localStorage.getItem("puzzle") ?? '[]'));
			setGameState(GameState.DONE);
		}
	}, []);
	const handleKeyPress = (key: string) => {

		if (gameState !== GameState.PLAYING) return;

		if (key === "BACKSPACE") {
			const newPuzzle = [...puzzle];
			const newRow = [...newPuzzle[row]];
			newRow[index - 1] = { char: '', state: BoxState.EMPTY };
			newPuzzle[row] = newRow;
			setPuzzle(newPuzzle);
			setIndex(v => {
				let newI = v - 1;
				if (newI < 0) newI = 0;
				return newI;
			});
		} else if (key === "ENTER") {
			if (index !== 5) return;

			const newPuzzle = [...puzzle];

			if (words.indexOf(getWordFromRow(newPuzzle[row]).toLowerCase()) === -1) {
				newPuzzle[row] = getEmptyRow(BoxState.ERROR);
				setPuzzle(newPuzzle);
				setIndex(0);

				return;
			}

			const newRow = computeNewStateForRow(newPuzzle[row], solution);
			newPuzzle[row] = newRow;
			setPuzzle(newPuzzle);

			if (newRow.every(v => v.state === BoxState.CORRECT)) {
				setGameState(GameState.DONE);
				return;
			}

			setIndex(0);
			setRow(r => {
				let newR = r + 1;
				if (newR > 5) {
					setGameState(GameState.DONE);
				}
				return newR;
			});
		} else {
			if (index > 4) return;
			const newPuzzle = [...puzzle];
			const newRow = [...newPuzzle[row]];
			newRow[index] = { char: key, state: BoxState.EMPTY };
			newPuzzle[row] = newRow;
			setPuzzle(newPuzzle);
			setIndex(v => v + 1);
		}
	};

	return <>
		<div className={styles.container}>
			<Nav />
			<Solution puzzle={puzzle} row={row} index={index} />
			<Keyboard puzzle={puzzle} onKeyPress={handleKeyPress} gameState={gameState} />
		</div>
		{gameState !== GameState.PLAYING && <Window
			solution={solution}
			setToast={setToast}
			puzzle={puzzle}
		/>}
		{toast && <Toast msg={toast} setToast={setToast} />}
	</>
}

