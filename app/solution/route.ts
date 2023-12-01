import { getWordOfTheDay } from "@/lib/get-word-of-the-day";

export const GET = async (): Promise<Response> => {
  try {
    return Response.json(await getWordOfTheDay());
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
};
