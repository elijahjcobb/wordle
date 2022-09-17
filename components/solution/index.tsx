import clsx from "clsx";
import styles from "./index.module.css";

export enum BoxState {
	EMPTY,
	INCORRECT,
	MISPLACED,
	CORRECT,
	ERROR
}

export interface BoxProps { char: string, state: BoxState }

function Box({ char, state, isActive }: BoxProps & { isActive: boolean }) {
	return <div className={clsx(styles.box, {
		[styles.empty]: state === BoxState.EMPTY,
		[styles.incorrect]: state === BoxState.INCORRECT,
		[styles.misplaced]: state === BoxState.MISPLACED,
		[styles.correct]: state === BoxState.CORRECT,
		[styles.error]: state === BoxState.ERROR,
		[styles.active]: isActive
	})}>
		<span>{char}</span>
	</div>
}

export function Solution(props: { puzzle: BoxProps[][], row: number, index: number }) {
	return <div className={styles.container}>
		{props.puzzle.map((row, i) => {
			return <div className={styles.row} key={`row-${row[0].char}-${i}`}>
				{row.map((box, j) => {
					return <Box
						isActive={i === props.row && j === props.index}
						key={`${box.char}-${j}`}
						state={box.state}
						char={box.char} />
				})}
			</div>
		})}
	</div>
}