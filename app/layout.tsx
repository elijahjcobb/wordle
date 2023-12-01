import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'wordle',
	description: 'A wordle clone made by Elijah Cobb.',
	openGraph: {
		title: "wordle",
		description: "A wordle clone made by Elijah Cobb.",
		images: ['https://wordle.elijahcobb.com/og.png'],
	},
	twitter: {
		title: "wordle",
		description: "A wordle clone made by Elijah Cobb.",
		card: "summary_large_image",
		images: ['https://wordle.elijahcobb.com/og.png'],
	}
}


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