import { PostgresDialect } from "kysely";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Enviroment variables missing");
}

export const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString:  process.env.DATABASE_URL
  }),
});
