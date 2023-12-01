import styles from "./index.module.css";
import { FaInfoCircle } from "react-icons/fa";
import type { WordOfTheDay } from "@/lib/get-word-of-the-day";

export function Nav(meta: WordOfTheDay) {
	return <nav className={styles.container}>
		<h1>Wordle {meta.day} by {meta.editor}</h1>
		<a href="https://elijahcobb.dev" target={'_blank'} rel="noreferrer">
			<FaInfoCircle />
		</a>
	</nav>
}