import { T } from "@elijahjcobb/typr";

export interface WordOfTheDay {
  solution: string;
  day: number;
  editor: string;
}

export async function getWordOfTheDay(): Promise<WordOfTheDay> {
  try {
    const today = new Date();
    const url = `https://www.nytimes.com/svc/wordle/v2/${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}.json`;
    const response = await fetch(url, {
      cache: "no-cache",
    });
    const text = await response.text();
    console.log(text);
    const json = JSON.parse(text);
    const meta = T.object({
      id: T.number(),
      solution: T.string(),
      print_date: T.string(),
      days_since_launch: T.number(),
      editor: T.string(),
    }).verify(json);
    if (!meta) throw new Error("Invalid response from NYT.");
    return {
      solution: meta.solution.toUpperCase(),
      day: meta.days_since_launch,
      editor: meta.editor,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get word of the day.");
  }
}