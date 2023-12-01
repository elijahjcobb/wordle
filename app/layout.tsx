import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<title>wordle</title>
				<link rel="icon" href="/icon.svg" />
			</head>
			<body>
				<Analytics />
				{children}
			</body>
		</html>
	)
}