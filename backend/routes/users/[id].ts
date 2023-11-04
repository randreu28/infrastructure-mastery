export default eventHandler(async (event) => {
  const id = Number(event.context.params.id);

  if (isNaN(id)) {
    return sendErr(event, {
      statusCode: 400,
      statusMessage: "Parameter is not a number",
    });
  }

  const user = await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (user === undefined) {
    return sendErr(event, {
      statusCode: 404,
      statusMessage: `User not found with id ${id}`,
    });
  }

  return user;
});
