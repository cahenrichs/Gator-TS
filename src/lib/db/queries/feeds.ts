import { db } from "../index.js";
import { feeds, users } from "../schema.js";
import { Feed, User } from "../schema.js";
import { eq } from "drizzle-orm";


export async function createFeed(name: string, url: string, userId: string) {
    const post = await db.insert(feeds).values({ name, url, userId }).returning();
    return post[0];
}

export async function getFeeds() {
    return db.select().from(feeds).innerJoin(users, eq(feeds.userId, users.id));
}