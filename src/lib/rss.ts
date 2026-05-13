import { XMLParser } from "fast-xml-parser";

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

type RSSFeed = {
    title: string;
    link: string;
    description: string;
    items: RSSItem[];
};

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator"
        }
    });
    const xml = await response.text();
    const parser = new XMLParser();
    const jsonObj = parser.parse(xml);

}