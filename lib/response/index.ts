import type { HandlerResponse } from "@netlify/functions";
import { isApp } from "../env";

function getCorsHeaders(): {
  [header: string]: string | number | boolean
  } {
  const allowedOrigin = isApp() ?
    "https://stately-pastelito-cf587a.netlify.app/login"
    : "http://localhost:5173"

  return {
    "access-control-allow-headers": "x-forwarded-by",
    "access-control-allow-methods": "GET",
    "access-control-allow-origin": allowedOrigin,
  }
}

export class AnyResponse {
  headers: {
    [header: string]: string | number | boolean
  }
  statusCode: number

  constructor(statusCode: number) {
    this.headers = {
      ...getCorsHeaders(),
      "content-type": "application/json",
      "x-powered-by": "sauce",
    }

    this.statusCode = statusCode
  }

  build(): HandlerResponse {
    return {
      headers: this.headers,
      statusCode: this.statusCode
    }
  }
}

export class ErrInvalidRequestResponse extends AnyResponse {
  message: string

  constructor(message: string) {
    super(400)

    this.message = message
  }

  build(): HandlerResponse {
    return {
      ...super.build(),
      body: JSON.stringify({ error: this.message }),
    }
  }
}

export class JsonOkResponse extends AnyResponse {
  data: Record<string, string | number | boolean | null> | Record<string, string | number | boolean | null>[]

  constructor(data: Record<string, string | number | boolean | null>) {
    super(200)

    this.data = data
  }

  build(): HandlerResponse {
    return {
      ...super.build(),
      body: JSON.stringify(this.data),
    }
  }
}
