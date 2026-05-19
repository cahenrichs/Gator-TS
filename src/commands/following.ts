import { readConfig } from "../config.js";
import { getFeedFollowsForUser } from "../lib/db/queries/feedFollows.js";
import { getUserByName } from "../lib/db/queries/users.js";
import { User } from "../lib/db/schema.js";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    if (args.length > 0) {
        throw new Error("Usage: following");
    }

    const config = readConfig();

    const getuser = await getUserByName(config.currentUserName);

    if (!getuser) {
        throw new Error("User not found");
    }

    const getFeedFollows = await getFeedFollowsForUser(getuser.id);

    if (getFeedFollows.length === 0) {
        console.log("You aren't following any feeds yet.");
        return;
    }

    for (const feedFollow of getFeedFollows) {
        console.log(`Feed: ${feedFollow.feedName}`);
    }
}