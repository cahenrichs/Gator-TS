import {readConfig} from './src/config.js';
import { defineConfig } from 'drizzle-kit';

const config = readConfig();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.dbUrl,
  },
});