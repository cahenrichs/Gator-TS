import { feedFollows, feeds, NewPost, posts } from "../schema.js";
import { db } from "../index.js";
import { eq, desc } from "drizzle-orm";

export async function createPost(post: NewPost) {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
}

export async function getPostsForUser(user_id: string, limit: number) {
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
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .where(eq(feedFollows.userId, user_id))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
    return postDetails;
};
