import { CommandHandler, UserCommandHandler } from "./commands/commands.js";
import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";


export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    const config = readConfig();
    if (!config.currentUserName) {
      console.error("No user logged in. Please log in first.");
      return;
    }
    const user = await getUser(config.currentUserName);
    if (!user) {
      console.error(`Logged in user "${config.currentUserName}" not found in database.`);
      return;
    }
    await handler(cmdName, user, ...args);
  };
}