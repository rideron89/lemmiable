import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import axios from "axios";
import { ErrInvalidRequestResponse, JsonOkResponse } from "../../lib/response";

const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const forwardedIp: string | undefined = event.headers["x-forwarded-for"]
  if (!forwardedIp) {
    return new ErrInvalidRequestResponse("invalid x-forwarded-for header",).build()
  }

  const hostname: string | undefined = event.queryStringParameters?.hostname
  if (!hostname) {
    return new ErrInvalidRequestResponse("invalid hostname").build()
  }

  const response = await axios.get(`${hostname}/api/v3/community/list`, {
    headers: {
      "x-forwarded-by": forwardedIp,
    },
  })

  switch (response.status) {
  case 200:
    return new JsonOkResponse(response.data).build()
  case 418:
    console.error(`status ${response.status}; ${await response.data}`)
    return new ErrInvalidRequestResponse("invalid request").build()
  default:
    console.error(`unexpected status code: ${response.status}`)
    return new ErrInvalidRequestResponse("unexpected status code").build()
  }
};

export { handler };
