export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id);

  if (isNaN(id)) {
    return new Response(
      JSON.stringify({ message: "parameter is not a number" }),
      { status: 400 }
    );
  }
  const user = await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (user === undefined) {
    return new Response(
      JSON.stringify({ message: `User not found with id ${id}` }),
      { status: 404 }
    );
  }
  return user;
});
