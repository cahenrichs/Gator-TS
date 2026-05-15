import { readConfig } from '../config.js';
import { createFeed } from '../lib/db/queries/feeds.js';
import { getUserByName } from '../lib/db/queries/users.js';
import { Feed, User } from '../lib/db/schema.js';

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    const name = args[0];
    const url = args[1];
    if (!name || !url) {
        throw new Error('Usage: addFeed <name> <url>');
    }
    const config = readConfig();
    const user = await getUserByName(config.currentUserName);
    if (!user) {
        throw new Error(`User "${config.currentUserName}" not found.`);
    }
    const feed = await createFeed(name, url, user.id);
    printFeed(feed, user);   
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

