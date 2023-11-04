import { Kysely } from "kysely";
import { logger } from "../logger";
import { dialect } from "./dialect";
import { DB } from "./tables.g";

export const db = new Kysely<DB>({
  dialect,
  log: (log) => {
    logger.info(log.query.sql);
  },
});
