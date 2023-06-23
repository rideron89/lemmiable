import type { HandlerResponse } from "@netlify/functions";

export class AnyResponse {
  statusCode: number

  constructor(statusCode: number) {
    this.statusCode = statusCode
  }

  build(): HandlerResponse {
    return { statusCode: this.statusCode }
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
      headers: {
        "content-type": "application/json",
      },
    }
  }
}

export class JsonOkResponse extends AnyResponse {
  data: Record<string, string | number | boolean | null>

  constructor(data: Record<string, string | number | boolean | null>) {
    super(200)

    this.data = data
  }

  build(): HandlerResponse {
    return {
      ...super.build(),
      body: JSON.stringify(this.data),
      headers: {
        "content-type": "application/json",
      },
    }
  }
}
