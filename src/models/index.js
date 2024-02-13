// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const FriendRequestStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const PostType = {
  "THOUGHT": "THOUGHT",
  "EVENT_ANNOUNCEMENT": "EVENT_ANNOUNCEMENT",
  "ITEM_FOR_SALE": "ITEM_FOR_SALE"
};

const Visibility = {
  "PUBLIC": "PUBLIC",
  "FRIENDS_ONLY": "FRIENDS_ONLY",
  "FRIENDS_OF_FRIENDS": "FRIENDS_OF_FRIENDS",
  "PRIVATE": "PRIVATE"
};

const { FriendRequest, User, Community, Post, Comment, Event, ItemForSale, UserCommunity, UserLikedPosts, UserLikedEvents, UserLikedItems } = initSchema(schema);

export {
  FriendRequest,
  User,
  Community,
  Post,
  Comment,
  Event,
  ItemForSale,
  UserCommunity,
  UserLikedPosts,
  UserLikedEvents,
  UserLikedItems,
  FriendRequestStatus,
  PostType,
  Visibility
};