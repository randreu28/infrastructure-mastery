export default eventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const post = await db
    .selectFrom("posts")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (!post) {
    return sendErr(event, {
      statusCode: 404,
      statusMessage: `Post notfound with id ${id}`,
    });
  }

  return post;
});
