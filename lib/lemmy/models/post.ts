export interface LemmyPost {
  "community": {
      "actor_id": string;
      "deleted": boolean;
      "hidden": boolean;
      "id": number;
      "instance_id": number;
      "local": boolean;
      "name": string;
      "nsfw": boolean;
      "posting_restricted_to_mods": boolean;
      "published": string;
      "removed": boolean;
      "title": "test"
  },
  "counts": {
      "comments": number;
      "downvotes": number;
      "featured_community": boolean;
      "featured_local": boolean;
      "hot_rank": number;
      "hot_rank_active": number;
      "id": number;
      "newest_comment_time": string;
      "newest_comment_time_necro": string;
      "post_id": number;
      "published": string;
      "score": number;
      "upvotes": 1
  },
  "creator": {
      "actor_id": string;
      "admin": boolean;
      "banned": boolean;
      "bot_account": boolean;
      "deleted": boolean;
      "id": number;
      "instance_id": number;
      "local": boolean;
      "name": string;
      "published": string;
  },
  "creator_banned_from_community": boolean;
  "creator_blocked": boolean;
  "post": {
      "ap_id": string;
      "body": string;
      "community_id": number;
      "creator_id": number;
      "deleted": boolean;
      "featured_community": boolean;
      "featured_local": boolean;
      "id": number;
      "language_id": number;
      "local": boolean;
      "locked": boolean;
      "name": string;
      "nsfw": boolean;
      "published": string;
      "removed": boolean;
  },
  "read": boolean;
  "saved": boolean;
  "subscribed": string;
  "unread_comments": number;
}
