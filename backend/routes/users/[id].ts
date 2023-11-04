export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id);

  if (isNaN(id)) {
    return res(400, "Parameter is not a number");
  }

  const user = await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (user === undefined) {
    return res(404, `User not found with id ${id}`);
  }

  return user;
});
