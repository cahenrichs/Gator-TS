import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds.js";
import { createPost } from "../lib/db/queries/posts.js";
import { fetchFeed } from "../lib/rss.js";
import { parseDuration } from "../lib/time.js";


export async function handlerAgg(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        console.error("Usage: agg <time_between_requests>");
        return;
    }
    const timeBetweenReqs = args[0];

    const durationMs = parseDuration(timeBetweenReqs);
    if (durationMs === null) {
        console.error("Invalid duration format. Use formats like '10s', '5m', '1h', etc.");
        return;
    }

    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
    }, durationMs);

  await new Promise<void>((resolve) => {
  process.on("SIGINT", () => {
    console.log("Shutting down feed aggregator...");
    clearInterval(interval);
    resolve();
  });
});
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
        try {
        const post = await createPost({
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt: new Date(item.pubDate),
            feedId: getFeeds.id
        }
            
        );
        console.log(`Created post: ${post.title}`);
    } catch (e) {
    }
}
}

function handleError(err: unknown): never {
  throw err instanceof Error ? err : new Error(String(err));
}
