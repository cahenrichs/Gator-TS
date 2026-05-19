import { readConfig } from '../config.js';
import { createFeedFollow } from '../lib/db/queries/feedFollows.js';
import { createFeed, getFeeds } from '../lib/db/queries/feeds.js';
import { getUserByName } from '../lib/db/queries/users.js';
import { Feed, User } from '../lib/db/schema.js';

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    const name = args[0];
    const url = args[1];
    if (!name || !url) {
        throw new Error('Usage: addFeed <name> <url>');
    }
    const config = readConfig();
    const getuser = await getUserByName(config.currentUserName);
    if (!getuser) {
        throw new Error(`User "${config.currentUserName}" not found.`);
    }
    const feed = await createFeed(name, url, user.id);
    const addedFeed = await createFeedFollow(user.id, feed.id);

    printFeed(feed, getuser);   

}

export function printFeed(feed: Feed, user: User) {
    console.log(`Feed: ${feed.name}`);
    console.log(`URL: ${feed.url}`);
    console.log(`User: ${user.name}`);
    console.log(`id: ${feed.id}`);
    console.log(`createdAt: ${feed.createdAt}`);    
    console.log(`updatedAt: ${feed.updatedAt}`);
    console.log(`userId: ${feed.userId}`);
}

export async function handlerListFeeds(cmdName: string, ...args: string[]) {
    const result = await getFeeds();
    for (const { feeds, users } of result) {
        console.log(`Feed: ${feeds.name}`);
        console.log(`URL: ${feeds.url}`);
        console.log(`User Name: ${users.name}`);
    }
} 