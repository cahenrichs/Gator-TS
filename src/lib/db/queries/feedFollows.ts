import { db } from "../index.js";
import { feeds, users, feedFollows } from "../schema.js";
import { Feed, User } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createFeedFollow(userId: string, feedId: string) {
const [newFeedFollow] = await db.insert(feedFollows).values({ feedId, userId }).returning();


const[feedFollowsDetails] = await db.select({
    id: feedFollows.id,
    createdAt: feedFollows.createdAt,
    updatedAt: feedFollows.updatedAt,

    feedId: feeds.id,
    feedName: feeds.name,
    userId: users.id,
    userName: users.name,
}).from(feedFollows)
.innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
.innerJoin(users, eq(feedFollows.userId, users.id))
.where(eq(feedFollows.id, newFeedFollow.id));

return feedFollowsDetails;
}
