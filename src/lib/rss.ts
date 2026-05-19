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
    const parser = new XMLParser({processEntities: false});
    const jsonObj = parser.parse(xml);

    if (!jsonObj.rss || !jsonObj.rss.channel) {
        throw new Error("Invalid RSS feed");
    }
    const channel = jsonObj.rss.channel;
    
   if (typeof channel.title !== "string" || typeof channel.link !== "string" || typeof channel.description !== "string") {
    throw new Error("Invalid RSS feed: Missing required channel properties");
   }

   let rawItems: any[] = [];
   if (channel.item) {
   if (Array.isArray(channel.item)) {
       rawItems = channel.item;
   } else {
    rawItems = [channel.item];
   }
}
const items: RSSItem[] = [];
for (const item of rawItems) {
    if (
        typeof item.title !== "string" ||
        typeof item.link !== "string" ||
        typeof item.description !== "string" ||
        typeof item.pubDate !== "string"
    ) {
        continue; 
    }

    items.push({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate
    });     
}
return {
    channel: {
        title: channel.title,
        link: channel.link,
        description: channel.description,
        item: items
    }
};
}