import { getFeedsByUrl } from "../lib/db/queries/feeds.js";
import { deleteFeedFollow } from "../lib/db/queries/feedFollows.js";
import { readConfig } from "../config.js";
import { User } from "../lib/db/schema.js";
import { getUserByName } from "../lib/db/queries/users.js";
import { get } from "node:http";


export async function handlerUnfollow(
    cmdName: string,
    user: User,
    url: string
) {

  if (!url) {
    throw new Error("No feed URL provided. Usage: unfollow <feed_url>");
  }
  
  const getFeed = await getFeedsByUrl(url);

  if (!getFeed) {
    throw new Error("Feed not found");
  }

  const getuser = await getUserByName(user.name);

  if (!getuser) {
    throw new Error("User not found");
  }

  const deleted = await deleteFeedFollow(user.id, getFeed.id);

  if (deleted) {
    console.log(`Successfully unfollowed feed with URL: ${getFeed.url}`);
  } else {
    console.log(`You were not following the feed with URL: ${getFeed.url}`);
  }
}