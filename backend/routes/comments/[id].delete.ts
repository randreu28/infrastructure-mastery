export default eventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const deleted = await db
    .deleteFrom("comments")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();

  if (deleted === undefined) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: `Could not delete comment with id ${id}`,
    });
  }

  return deleted;
});
