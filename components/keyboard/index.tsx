import styles from "./index.module.css";
import { clsx } from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GameState } from "@/components/page";
import { BoxProps, BoxState } from "../solution";

const KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

export function Key(props: { puzzle: BoxProps[][], gameState: GameState, char: string, onPress: (key: string) => void }) {
	const [isTouching, setIsTouching] = useState(false);

	const keyState = useMemo<BoxState>(() => {
		for (const row of props.puzzle) {
			for (const key of row) {
				if (key.char.toLowerCase() === props.char.toLowerCase()) return key.state;
			}
		}
		return BoxState.EMPTY;
	}, [props.char, props.puzzle]);

	const handleTouchStart = useCallback(() => {
		if (props.gameState !== GameState.PLAYING) return;
		setIsTouching(true);
	}, [props.gameState]);

	const handleTouchEnd = useCallback(() => {
		if (props.gameState !== GameState.PLAYING) return;
		setIsTouching(false);
		props.onPress(props.char);
	}, [props]);

	useEffect(() => {
		const keyDown = (e: KeyboardEvent) => {
			if (e.key.toUpperCase() === props.char) handleTouchStart();
		}
		const keyUp = (e: KeyboardEvent) => {
			if (e.key.toUpperCase() === props.char) {
				handleTouchEnd();
			}
		}
		document.addEventListener("keyup", keyUp);
		document.addEventListener("keydown", keyDown);
		return () => {
			document.removeEventListener("keyup", keyUp);
			document.removeEventListener("keydown", keyDown);
		}
	}, [handleTouchEnd, handleTouchStart, props.char]);

	const key = useMemo(() => {
		if (props.char === "ENTER") return '⏎';
		else if (props.char === "BACKSPACE") return '⌫';
		else return props.char;
	}, [props.char]);

	return <div
		onMouseDown={handleTouchStart}
		onMouseUp={handleTouchEnd}
		onTouchStart={() => setIsTouching(true)}
		onTouchEnd={() => setIsTouching(false)}
		className={clsx(styles.key, {
			[styles.touch]: isTouching,
			[styles.incorrect]: keyState === BoxState.INCORRECT,
			[styles.misplaced]: keyState === BoxState.MISPLACED,
			[styles.correct]: keyState === BoxState.CORRECT,
		})}>
		<span>{key}</span>
	</div>
}

export function Keyboard(props: { puzzle: BoxProps[][], onKeyPress: (key: string) => void, gameState: GameState }) {
	return <div className={styles.keyboard}>
		{KEYS.map(row => {
			return <div className={styles.row} key={row.join("")}>
				{row.map(key => {
					return <Key puzzle={props.puzzle} gameState={props.gameState} onPress={props.onKeyPress} key={key} char={key} />
				})}
			</div>
		})}
	</div>
}