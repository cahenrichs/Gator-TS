import { User } from "../lib/db/schema.js";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
if (!registry[cmdName]) {
    throw new Error(`Command not found: ${cmdName}`);
}
await registry[cmdName](cmdName, ...args);
}

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;