import { GameState } from "../page"
import { BoxProps, Solution } from "../solution";
import styles from "./index.module.css";

export interface WindowProps {
	gameState: GameState;
	puzzle: BoxProps[][];
	solution: string;
}

export function Window(props: WindowProps) {
	return <div className={styles.container}>
		<h2>You {props.gameState === GameState.WIN ? "Win! 😎" : "Lose 🫠"}</h2>
		<div className={styles.solutionContainer}>
			<Solution
				puzzle={props.puzzle}
				index={0}
				row={-1}
			/>
		</div>
		<div className={styles.solution}>
			<span>{props.solution}</span>
		</div>
		<div className={styles.spacer} />
		<div className={styles.buttons}>
			<button className={styles.reset} onClick={() => {
				window.open("/", "_self")
			}}>Reset</button>
			<button className={styles.share} onClick={() => {

			}}>Share</button>
		</div>
	</div>
}