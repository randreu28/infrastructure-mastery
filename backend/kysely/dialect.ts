import { PostgresDialect } from "kysely";
import { Pool } from "pg";

if (
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_PORT ||
  !process.env.POSTGRES_MAX
) {
  throw new Error("Enviroment variables missing");
}

export const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    max: Number(process.env.POSTGRES_MAX),
  }),
});
