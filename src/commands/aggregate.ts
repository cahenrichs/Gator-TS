import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds.js";
import { fetchFeed } from "../lib/rss.js";


export async function handlerAgg(cmdName: string, ...args: string[]) {
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(feed);
}

async function scrapeFeeds() {
    const getFeeds = await getNextFeedToFetch();
    if (!getFeeds) {
        console.log("No feeds to fetch.");
        return;
    }

    const feedData = await fetchFeed(getFeeds.url);
    
    const marked = await markFeedFetched(getFeeds.id);
    if (!marked) {
        console.error(`Failed to mark feed ${getFeeds.id} as fetched.`);
    }

    for (const item of feedData.channel.item) {
        console.log(`Title: ${item.title}`);
    }

}