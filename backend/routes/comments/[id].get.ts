export default eventHandler((event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const comment = db
    .selectFrom("comments")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!comment) {
    return sendErr(event, {
      statusCode: 404,
      statusMessage: `Comment notfound with id ${id}`,
    });
  }

  return comment;
});
