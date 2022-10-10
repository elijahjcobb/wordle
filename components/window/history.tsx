import { useMemo } from "react";
import styles from "./history.module.css";

export interface HistoryItemProps {
	value: number;
	label: string;
	count: number;
}

export function HistoryItem({ label, count, value }: HistoryItemProps) {
	return <div className={styles.item}>
		<span className={styles.score}>{label}</span>
		<div className={styles.outer}>
			<div className={styles.inner} style={{ width: `${value * 100}%` }} />
		</div>
		<span className={styles.count}>{count}</span>
	</div>
}

const ARRAY = [1, 2, 3, 4, 5, 6];

export function History() {

	const scores = useMemo<{ value: number, count: number }[]>(() => {
		const history = JSON.parse(localStorage.getItem("history") ?? "{}") as Record<string, number>;
		const distribution = new Map<number, number>();
		const historyValues = Object.values(history);
		for (const historicalScore of historyValues) distribution.set(historicalScore, (distribution.get(historicalScore) ?? 0) + 1)
		const totalGames = historyValues.length;
		return ARRAY.map(i => {
			const count = distribution.get(i - 1) ?? 0;
			return { value: count / totalGames, count }
		});
	}, []);

	return <div className={styles.container}>
		{ARRAY.map(i => <HistoryItem label={`${i}`} count={scores[i]?.count ?? 0} key={i} value={scores[i]?.value ?? 0} />)}
	</div>
}