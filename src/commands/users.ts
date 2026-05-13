import { setUser } from "../config.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {

    if (args.length === 0) {
        throw new Error('Username is required for login command.');
    }
    setUser(args[0]);
    console.log("User has been set")
}