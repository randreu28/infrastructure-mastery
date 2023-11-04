import { db } from "../kysely";

export default eventHandler(() => {
  const posts = db.selectFrom("posts").selectAll().execute();
  return posts;
});
