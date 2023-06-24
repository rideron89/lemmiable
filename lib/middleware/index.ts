export * from "./needForwardedIp";
export * from "./needsHostname";

import type { Handler, HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";

export class AppHandler {
  middlewares: Middleware[] = []

  static withMiddlewares(middlewares: Middleware[]) {
    const instance = new AppHandler()
    instance.middlewares = middlewares
    return instance
  }

  handle(handler: HandlerWithMiddlewareData): Handler {
    return async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
      const data: MiddlewareData = {}

      for (const middleware of this.middlewares) {
        const response = await middleware(event, context, data)
        if (response) {
          return response
        }
      }

      return handler(event, context, data)
    }
  }
}

export type Middleware = (event: HandlerEvent, context: HandlerContext, data: MiddlewareData) => Promise<HandlerResponse | null>

export type MiddlewareData = Record<string, unknown>

export type HandlerWithMiddlewareData = (event: HandlerEvent, context: HandlerContext, data: MiddlewareData) => Promise<HandlerResponse>
