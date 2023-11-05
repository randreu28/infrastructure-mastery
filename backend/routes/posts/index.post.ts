export default eventHandler(async (event) => {
  const post = await readValidatedBody(event, postSchema.safeParse);

  if (post.success === false) {
    return sendErr(event, {
      statusCode: 400,
      data: post.error,
    });
  }

  return db
    .insertInto("posts")
    .values({ ...post.data, createdAt: new Date() })
    .returningAll()
    .executeTakeFirst();
});
