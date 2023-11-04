export default eventHandler(() => {
  logger.info("HELLO!");
  const posts = db.selectFrom("posts").selectAll().execute();
  return posts;
});
