import { useEffect, useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

export interface ToastProps {
	msg: string;
	setToast: (msg: string | undefined) => void;
}

export function Toast({ msg, setToast }: ToastProps) {

	useEffect(() => {
		const t = setTimeout(() => {
			setToast(undefined);
		}, 5000);
		return () => clearTimeout(t);
	}, [setToast]);

	return <div className={clsx(styles.container)}>
		<span>{msg}</span>
	</div>
}