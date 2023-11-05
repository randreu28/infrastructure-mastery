export default eventHandler(async (event) => {
  const id = Number(event.context.params.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const post = await readValidatedBody(event, postSchema.safeParse);

  if (post.success === false) {
    return sendErr(event, { statusCode: 400, data: post.error });
  }

  const deleted = await db
    .updateTable("posts")
    .where("id", "=", id)
    .set(post.data)
    .returningAll()
    .executeTakeFirst();

  if (deleted === undefined) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: `Could not update data on post with id ${id}`,
    });
  }

  return deleted;
});
