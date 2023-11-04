import { Kysely } from "kysely";
import { dialect } from "./dialect";
import { DB } from "./tables.g";

export const db = new Kysely<DB>({
  dialect,
  log: (log) => {
    console.log(log.query.sql);
  },
});
