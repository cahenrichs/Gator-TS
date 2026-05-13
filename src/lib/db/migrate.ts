import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { readConfig } from "../../config.js";

const config = readConfig();

// Note: migrations need max: 1 connection
const migrationClient = postgres(config.dbUrl, { max: 1 });

await migrate(drizzle(migrationClient), {
  migrationsFolder: "./src/lib/db/migrations",
});

await migrationClient.end();
