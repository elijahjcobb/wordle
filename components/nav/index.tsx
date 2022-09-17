import styles from "./index.module.css";
import { FaInfoCircle } from "react-icons/fa";

export function Nav() {
	return <nav className={styles.container}>
		<h1>Wordle</h1>
		<a href="https://elijahcobb.dev" target={'_blank'} rel="noreferrer">
			<FaInfoCircle />
		</a>
	</nav>
}