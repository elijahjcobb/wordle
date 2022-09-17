import { GetServerSideProps } from "next";
import { PageProps, Page } from "../components/page";

export default Page;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	const { solution } = await fetch("https://wordle-api.elijahcobb.com/").then(r => r.json())
	const words = await fetch("https://wordle.elijahcobb.com/words.txt").then(r => r.text())
	return {
		props: {
			solution: solution.toUpperCase(),
			words: words.split("\n")
		}
	}
}