export interface LemmyCommunityInfo {
  actor_id: string
  deleted: boolean
  description: string
  hidden: boolean
  id: number
  instance_id: number
  local: boolean
  name: string
  nsfw: boolean
  posting_restricted_to_mods: boolean
  published: string
  removed: boolean
  title: string
}

export type LemmyCommunitySubscriptionStatus = "NotSubscribed" | "Subscribed"

export interface LemmyCommunitySubscriptionData {
  subscribed: LemmyCommunitySubscriptionStatus
}

export interface LemmyCommunityBlockedData {
  blocked: boolean
}

export interface LemmyCommunityCounts {
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

export type LemmyCommunity = LemmyCommunitySubscriptionData & LemmyCommunityBlockedData & {
  community: LemmyCommunityInfo
  counts: LemmyCommunityCounts
}
