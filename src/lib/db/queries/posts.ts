import { feedFollows, feeds, NewPost, posts } from "../schema.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";

export async function createPost(post: NewPost) {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
}

export async function getPostsForUser(user_id: string) {
    const postDetails = await db.select({
    id: posts.id,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
    title: posts.title,
    url: posts.url,
    description: posts.description,
    publishedAt: posts.publishedAt,
    user_id: feedFollows.userId,
    }).from(posts)
    .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
    .innerJoin(feeds, eq(posts.feedId, feedFollows.feedId))
    .where(eq(feedFollows.userId, user_id));
    return postDetails;
};


/*export async function getFeedFollowsForUser(userId: string) {
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

    */
