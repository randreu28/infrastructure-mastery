export default eventHandler(() => {
  return db.selectFrom("comments").selectAll().execute();
});
