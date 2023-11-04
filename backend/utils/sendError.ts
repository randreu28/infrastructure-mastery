type Event = Parameters<typeof sendError>[0];
type Error = Parameters<typeof createError>[0];

export function sendErr(event: Event, error: Error) {
  return sendError(event, createError(error));
}
