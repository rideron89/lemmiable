import type { Handler, HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";
import axios from "axios";
import { LemmyPost } from "../../lib/lemmy";
import { AppHandler, MiddlewareData, needsForwardedIp, needsHostname } from "../../lib/middleware";
import { ErrInvalidRequestResponse, JsonOkResponse } from "../../lib/response";

const handler: Handler = AppHandler.withMiddlewares([
  needsForwardedIp,
  needsHostname,
]).handle(async (event: HandlerEvent, context: HandlerContext, data: MiddlewareData): Promise<HandlerResponse> => {
  const { forwardedIp, hostname } = data as { forwardedIp: string, hostname: string }
  const { limit, page } = event.queryStringParameters ?? {}

  const url = `${hostname}/api/v3/post/list`.replace(/\/\//g, "/")
  const response = await axios.get(url, {
    headers: {
      "x-forwarded-by": forwardedIp,
    },
    params: {
      limit,
      page,
    }
  })

  switch (response.status) {
  case 200:
    return new JsonOkResponse<LemmyPost>(response.data.posts).build()
    // return new JsonOkResponse<AppCommunity>(response.data.communities.map((c: LemmyCommunity): AppCommunity => ({
    //   ...c.community,
    //   blocked: c.blocked,
    //   subscribed: c.subscribed,
    //   counts: c.counts,
    // }))).build()
  case 418:
    console.error(`status ${response.status}; ${await response.data}`)
    return new ErrInvalidRequestResponse("invalid request").build()
  default:
    console.error(`unexpected status code: ${response.status}`)
    return new ErrInvalidRequestResponse("unexpected status code").build()
  }
})

export { handler };
