import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import axios from "axios";
import { ErrInvalidRequestResponse, JsonOkResponse } from "../../lib/response";

interface CommunityInfo {
  id: number
  name: string
  title: string
  removed: boolean
  published: string
  deleted: boolean
  nsfw: boolean
  actor_id: string
  local: boolean
  hidden: boolean
  posting_restricted_to_mods: boolean
  instance_id: number
}

type CommunitySubscriptionStatus = "NotSubscribed" | "Subscribed"

interface CommunitySubscriptionData {
  subscribed: CommunitySubscriptionStatus
}

interface CommunityBlockedData {
  blocked: boolean
}

interface CommunityCounts {
  id:  number
  community_id:  number
  subscribers:  number
  posts:  number
  comments:  number
  published: string
  users_active_day: number
  users_active_week: number
  users_active_month: number
  users_active_half_year: number
  hot_rank: number
}

type RawCommunity = CommunitySubscriptionData & CommunityBlockedData & {
  community: CommunityInfo
  counts: CommunityCounts
}

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
    return new JsonOkResponse(response.data.communities.map((c: RawCommunity) => ({
      ...c.community,
      blocked: c.blocked,
      subscribed: c.subscribed,
      counts: c.counts,
    }))).build()
  case 418:
    console.error(`status ${response.status}; ${await response.data}`)
    return new ErrInvalidRequestResponse("invalid request").build()
  default:
    console.error(`unexpected status code: ${response.status}`)
    return new ErrInvalidRequestResponse("unexpected status code").build()
  }
};

export { handler };
