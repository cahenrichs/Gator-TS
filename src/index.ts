import { readConfig, setUser } from "./config.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands.js";
import { handlerListUsers, handlerLogin, handlerRegister } from "./commands/users.js";
import { handlerResetUsers } from "./commands/reset.js";
import { handlerAgg } from "./commands/aggregate.js";
import { handlerAddFeed, handlerListFeeds } from "./commands/addFeed.js";
import { handlerFollow } from "./commands/follow.js";
import { handlerFollowing } from "./commands/following.js";
import { middlewareLoggedIn } from "./middleware.js";
import { handlerUnfollow } from "./commands/unfollow.js";
import { handlerBrowse } from "./commands/browse.js";

async function main() {
const commandRegistry: CommandsRegistry = {};
await registerCommand(commandRegistry, "login", handlerLogin);
await registerCommand(commandRegistry, "register", handlerRegister);
await registerCommand(commandRegistry, "reset", handlerResetUsers);
await registerCommand(commandRegistry, "users", handlerListUsers);
await registerCommand(commandRegistry, "agg", handlerAgg); 
await registerCommand(commandRegistry, "addfeed",middlewareLoggedIn(handlerAddFeed));
await registerCommand(commandRegistry, "feeds", handlerListFeeds);
await registerCommand(commandRegistry, "follow", middlewareLoggedIn(handlerFollow));
await registerCommand(commandRegistry, "following",middlewareLoggedIn(handlerFollowing));
await registerCommand(commandRegistry, "unfollow", middlewareLoggedIn(handlerUnfollow));
await registerCommand(commandRegistry, "browse", middlewareLoggedIn(handlerBrowse));
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("No command provided.");
    process.exit(1);
}
const [cmdName, ...cmdArgs] = args;
try {
    await runCommand(commandRegistry, cmdName, ...cmdArgs);
} catch (error) {
    console.error(error);
    process.exit(1);
}
process.exit(0);
}

main();