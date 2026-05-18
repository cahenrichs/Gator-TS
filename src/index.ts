import { readConfig, setUser } from "./config.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands.js";
import { handlerListUsers, handlerLogin, handlerRegister } from "./commands/users.js";
import { handlerResetUsers } from "./commands/reset.js";
import { handlerAgg } from "./commands/aggregate.js";
import { handlerAddFeed, handlerListFeeds } from "./commands/addFeed.js";
import { handlerFollow } from "./commands/follow.js";

async function main() {
const commandRegistry: CommandsRegistry = {};
await registerCommand(commandRegistry, "login", handlerLogin);
await registerCommand(commandRegistry, "register", handlerRegister);
await registerCommand(commandRegistry, "reset", handlerResetUsers);
await registerCommand(commandRegistry, "users", handlerListUsers);
await registerCommand(commandRegistry, "agg", handlerAgg); 
await registerCommand(commandRegistry, "addfeed", handlerAddFeed);
await registerCommand(commandRegistry, "feeds", handlerListFeeds);
await registerCommand(commandRegistry, "follow", handlerFollow);
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("No command provided.");
    process.exit(1);
}
const [cmdName, ...cmdArgs] = args;
try {
    await runCommand(commandRegistry, cmdName, ...cmdArgs);
} catch (error) {
    console.error(`Error executing command: ${error}`);
    process.exit(1);
}
process.exit(0);
}

main();