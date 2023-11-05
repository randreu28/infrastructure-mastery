export default eventHandler(async (event) => {
  const id = Number(event.context.params.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  /**  Kysely is wrongly infering this type
   *  See {@link https://github.com/kysely-org/kysely/issues/758 | this issue}
   */
  const deleted = await db
    .deleteFrom("posts")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();

  if (deleted === undefined) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: `Could not delete post with id ${id}`,
    });
  }

  return deleted;
});
