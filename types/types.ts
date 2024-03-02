import { CreateEventInput, CreatePostInput, CreateCommentInput } from '@/src/API';

export enum Visibility {
  PUBLIC = 'PUBLIC',
  FRIENDS_ONLY = 'FRIENDS_ONLY',
  FRIENDS_OF_FRIENDS = 'FRIENDS_OF_FRIENDS',
  PRIVATE = 'PRIVATE',
}

export interface User {
  id: string;
  username: string;
  email: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  communities: Community[];
  selectedCommunity: Community;
  posts: Post[];
  friends: User[];
  friendRequests: FriendRequest[];
  events: Event[];
  itemsForSale: ItemForSale[];
  likedPosts: Post[];
  likedEvents: Event[];
  likedItems: ItemForSale[];
  location: string;
  age: number;
  bio: string;
  profilePic: string;
  pets: number;
  kids: number;
}

export interface Community {
  id: string;
  name: string;
  location: string;
  postalCode: string;
  image: string;
  members: User[];
  posts: Post[];
}

export interface CommentItem {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Comments {
  items: CommentItem[];
}

export interface Post {
  id: string;
  author: User;
  community: Community;
  images: string[];
  content: string;
  likedBy: User[];
  comments: Comments;
  visibility: Visibility;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  datetime: Date;
  community: Community;
  organizer: User;
  attendees: User[];
  likedBy: User[];
  visibility: Visibility;
}

export interface ItemForSale {
  id: string;
  title: string;
  description: string;
  images: string[];
  contact: string;
  price: number;
  seller: User;
  community: Community;
  likedBy: User[];
  visibility: Visibility;
}

export interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
}

export type EventDataInput = Omit<CreateEventInput, 'userEventsId' | 'communityEventsId'>;
export type PostDataInput = Omit<CreatePostInput, 'userEventsId' | 'communityEventsId'>;
export type CommentDataInput = Omit<CreateCommentInput, 'id' | '_version'>;
