import { db } from "../index.js";
import { feeds, users, feedFollows } from "../schema.js";
import { Feed, User } from "../schema.js";
import { eq, and } from "drizzle-orm";

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

export async function getFeedFollowsForUser(userId: string) {
    const feedFollowDetails = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        userName: users.name,
        feedName: feeds.name,
    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, userId));

    return feedFollowDetails;
}

export async function deleteFeedFollow(userId: string, feedId: string) {
     const [deletedFeedFollow] = await db.delete(feedFollows)
     .where(
        and(
        eq (feedFollows.userId, userId),
        eq (feedFollows.feedId, feedId),
        )
     )
     .returning();

     return deletedFeedFollow;
}