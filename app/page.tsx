import { Page } from "@/components/page";
import { generateOGURLFromParams } from "@/lib/generate-og-url";
import { getWordOfTheDay } from "@/lib/get-word-of-the-day";
import type { Metadata } from "next";

type Props = {
	searchParams: Record<string, string>
}

export async function generateMetadata(
	{ searchParams }: Props,
): Promise<Metadata> {
	if (!searchParams.score) return {};
	const images = [generateOGURLFromParams(`score=${searchParams.score}&boxes=${searchParams.boxes}`)];
	return {
		openGraph: {
			images,
		},
		twitter: {
			images,
		}
	}
}

export default async function ServerPage(): Promise<JSX.Element> {
	const meta = await getWordOfTheDay();
	return <Page meta={meta} />
}