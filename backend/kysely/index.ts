import { Kysely } from "kysely";
import { dialect } from "./dialect";
import { DB } from "./tables.g";
import consola from "consola";

export const db = new Kysely<DB>({
  dialect,
  log: (log) => consola.info(log.query.sql),
});
