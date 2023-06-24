import {
  LemmyCommunityBlockedData,
  LemmyCommunityCounts,
  LemmyCommunityInfo,
  LemmyCommunitySubscriptionData
} from "../../lib/lemmy";

export type AppCommunity = LemmyCommunityBlockedData & LemmyCommunityInfo & LemmyCommunitySubscriptionData & {
  counts: LemmyCommunityCounts
}
