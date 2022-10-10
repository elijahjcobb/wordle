import styles from "./index.module.css";
import { FaInfoCircle } from "react-icons/fa";
import { getWordleDay } from "../../data/helpers";

export function Nav() {
	return <nav className={styles.container}>
		<h1>Wordle - {getWordleDay()}</h1>
		<a href="https://elijahcobb.dev" target={'_blank'} rel="noreferrer">
			<FaInfoCircle />
		</a>
	</nav>
}