export default eventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const commenet = await readValidatedBody(event, commentSchema.safeParse);

  if (commenet.success === false) {
    return sendErr(event, { statusCode: 400, data: commenet.error });
  }

  const deleted = await db
    .updateTable("comments")
    .where("id", "=", id)
    .set(commenet.data)
    .returningAll()
    .executeTakeFirst();

  if (deleted === undefined) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: `Could not update data on comment with id ${id}`,
    });
  }

  return deleted;
});
