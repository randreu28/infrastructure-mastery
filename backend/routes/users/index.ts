export default eventHandler(() => {
  const posts = db.selectFrom("users").selectAll().execute();
  return posts;
});
