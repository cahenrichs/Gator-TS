import { db } from "../index.js";
import { users } from "../schema.js";

export async function createUser(name:string) {
    const [result] = await db.insert(users).values({ name }).returning();
    return result;
}

export async function getUserByName(name: string) {
    const user  = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.name, name)
    });
    return user;
}