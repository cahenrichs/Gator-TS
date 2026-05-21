import { getPostsForUser } from "../lib/db/queries/posts.js";
import { User } from "../lib/db/schema.js";


export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 2;
    if (args.length > 1) {
        throw new Error("Usage: browse <user-id>");
    }
    if (args.length === 0) {
        limit = parseInt(args[0], 10);
    }

    const getPosts = await getPostsForUser(user.id, limit);

    if (getPosts.length === 0) {
        console.log("No posts found. Make sure you're following some feeds and have run the aggregate command.");
        return;
    }

    for (const post of getPosts) {
        console.log(`Title: ${post.title}`);
        console.log(`URL: ${post.url}`);
        console.log(`Description: ${post.description}`);
        console.log(`Published At: ${post.publishedAt}`);
    }
}