export default eventHandler(() => {
  return db.selectFrom("posts").selectAll().execute();
});
