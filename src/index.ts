import { readConfig, setUser } from "./config.js";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands.js";
import { handlerLogin } from "./commands/users.js";

function main() {
const commandRegistry: CommandsRegistry = {};
registerCommand(commandRegistry, "login", handlerLogin);
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("No command provided.");
    process.exit(1);
}
const [cmdName, ...cmdArgs] = args;
try {
    runCommand(commandRegistry, cmdName, ...cmdArgs);
} catch (error) {
    console.error(`Error executing command: ${error}`);
    process.exit(1);
}
}

main();