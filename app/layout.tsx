import "./globals.css";

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
				<script async src="https://cdn.splitbee.io/sb.js" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/icon.svg" />
				<link rel="apple-touch-icon" href="/icon.png" />
				<meta name="theme-color" content='var(--bg)' />
			</head>
			<body>{children}</body>
		</html>
	)
}