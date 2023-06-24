import type { HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { Middleware, MiddlewareData } from "../../lib/middleware";
import { ErrInvalidRequestResponse } from "../../lib/response";

export const needsForwardedIp: Middleware = async (event: HandlerEvent, context: HandlerContext, data: MiddlewareData): Promise<HandlerResponse | null> => {
  const forwardedIp = event.headers["x-forwarded-for"] ?? event.headers["X-Forwarded-For"]
  data.forwardedIp = forwardedIp

  if (!forwardedIp?.length) {
    return new ErrInvalidRequestResponse("invalid x-forwarded-for header",).build()
  }

  return null
}
