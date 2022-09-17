import { GetServerSideProps } from "next";
import { PageProps, Page } from "../components/page";
import { readFile } from 'fs/promises';

export default Page;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	const { solution } = await fetch("https://wordle-api.elijahcobb.com/").then(r => r.json())
	const file = await readFile("./words.txt");
	return {
		props: {
			solution: solution.toUpperCase(),
			words: file.toString().split("\n")
		}
	}
}