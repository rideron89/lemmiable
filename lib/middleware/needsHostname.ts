import type { HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { Middleware, MiddlewareData } from "../../lib/middleware";
import { ErrInvalidRequestResponse } from "../../lib/response";

export const needsHostname: Middleware = async (event: HandlerEvent, context: HandlerContext, data: MiddlewareData): Promise<HandlerResponse | null> => {
  data.hostname = event.queryStringParameters?.hostname

  if (!data.hostname) {
    return new ErrInvalidRequestResponse("invalid hostname").build()
  }

  return null
}
