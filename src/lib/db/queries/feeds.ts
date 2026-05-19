import { db } from "../index.js";
import { feeds, users } from "../schema.js";
import { Feed, User } from "../schema.js";
import { sql, eq } from "drizzle-orm";
import { createFeedFollow } from "./feedFollows.js";


export async function createFeed(name: string, url: string, userId: string) {
    const post = await db.insert(feeds).values({ name, url, userId }).returning();
    return post[0];
}

export async function getFeeds() {
    return db.select().from(feeds).innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedsByUrl(url: string) {
    const [feed] = await db.select().from(feeds).where(eq(feeds.url, url));

  return feed;
}

export async function markFeedFetched(feedId: string) {
    const [updatedFeed] = await db.update(feeds)
    .set({ lastFetchedAt: new Date(), 
        updatedAt: new Date()
    })
    .where(eq(feeds.id, feedId))
    .returning();

    return updatedFeed;
}

export async function getNextFeedToFetch() {
    const [feed] = await db.select().from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} asc nulls first`)
    .limit(1);
    return feed;
}