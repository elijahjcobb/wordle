import { GetServerSideProps } from "next";
import { PageProps, Page } from "../components/page";

export default Page;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	const { solution } = await fetch("https://wordle-api.elijahcobb.com/").then(r => r.json())
	return {
		props: { solution: solution.toUpperCase() }
	}
}