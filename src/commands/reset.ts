import { resetDB } from "../lib/db/queries/users.js";

export async function handlerResetUsers(cmdName: string, ...args: string[]) {
    const reset = await resetDB();
    if (reset !== undefined) {
        console.log("Database has been reset.");
    } else {
        throw new Error("Failed to reset the database.");
    }
}