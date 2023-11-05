export default eventHandler(async (event) => {
  const comment = await readValidatedBody(event, commentSchema.safeParse);

  if (comment.success === false) {
    return sendErr(event, {
      statusCode: 400,
      data: comment.error,
    });
  }

  return db
    .insertInto("comments")
    .values({ ...comment.data, createdAt: new Date() })
    .returningAll()
    .executeTakeFirst();
});
