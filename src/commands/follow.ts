import { getUserByName } from "../lib/db/queries/users.js";
import { getFeedsByUrl } from "../lib/db/queries/feeds.js";
import { createFeedFollow } from "../lib/db/queries/feedFollows.js";
import { readConfig } from "../config.js";
import { User } from "../lib/db/schema.js";

export async function handlerFollow(
  cmdName: string,
  user: User,
  url: string,
) {
  if (!url) {
  throw new Error("Usage: follow <url>");
  }
  
  const config = readConfig();

  const getuser = await getUserByName(config.currentUserName);

  if (!getuser) {
    throw new Error("User not found");
  }

  const feed = await getFeedsByUrl(url);

  if (!feed) {
    throw new Error("Feed not found");
  }

  const feedFollow = await createFeedFollow(
    getuser.id,
    feed.id
  );

  console.log(
    `${feedFollow.userName} is now following ${feedFollow.feedName}`
  );
}