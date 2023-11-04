export function res(status: number, message: string) {
  return new Response(JSON.stringify({ message }), { status });
}
