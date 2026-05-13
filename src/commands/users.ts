import { config } from "process";
import { readConfig, setUser } from "../config.js";
import { createUser, getUserByName, getUsers } from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {

    if (args.length === 0) {
        throw new Error('Username is required for login command.');
    }
    const user = await getUserByName(args[0]);
    if (!user) {
        throw new Error('User not found. Please register first.');
    }
    setUser(args[0]);
    console.log("User has been set")
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error('Username is required for register command.');
    }
    if (await getUserByName(args[0])) {
        throw new Error('Username already exists.');
    }
    const user = await createUser(args[0]);
    console.log(`User created with ID: ${user.id}`);
    setUser(args[0]);
    console.log("User has been set")
}

export async function handlerListUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    if (users.length === 0) {
        console.log("No users found.");
    } else {
        const config = readConfig();
        users.forEach(user => {
            console.log(`${user.name}`);
            if (config.currentUserName === user.name) {
                console.log(` (${user.name} (current)`);
            }
        });
    }
}