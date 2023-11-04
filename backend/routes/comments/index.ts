export default eventHandler((event) => {
  return db.selectFrom("comments").selectAll().execute();
});
