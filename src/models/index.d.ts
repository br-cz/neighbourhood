import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum Visibility {
  PUBLIC = "PUBLIC",
  FRIENDS_ONLY = "FRIENDS_ONLY",
  FRIENDS_OF_FRIENDS = "FRIENDS_OF_FRIENDS",
  PRIVATE = "PRIVATE"
}



type EagerFriendRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FriendRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly senderId: string;
  readonly receiverId: string;
  readonly sender: User;
  readonly receiver: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userFriendRequestsId?: string | null;
}

type LazyFriendRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FriendRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly senderId: string;
  readonly receiverId: string;
  readonly sender: AsyncItem<User>;
  readonly receiver: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userFriendRequestsId?: string | null;
}

export declare type FriendRequest = LazyLoading extends LazyLoadingDisabled ? EagerFriendRequest : LazyFriendRequest

export declare const FriendRequest: (new (init: ModelInit<FriendRequest>) => FriendRequest) & {
  copyOf(source: FriendRequest, mutator: (draft: MutableModel<FriendRequest>) => MutableModel<FriendRequest> | void): FriendRequest;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly postalCode: string;
  readonly address?: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly communities: UserCommunity[];
  readonly selectedCommunity: string;
  readonly posts: Post[];
  readonly friends?: string[] | null;
  readonly friendRequests: FriendRequest[];
  readonly events: Event[];
  readonly itemsForSale: ItemForSale[];
  readonly likedPosts: UserLikedPosts[];
  readonly likedEvents: UserLikedEvents[];
  readonly likedItems: UserLikedItems[];
  readonly location?: string | null;
  readonly bio?: string | null;
  readonly profilePic?: string | null;
  readonly pronouns?: string | null;
  readonly contact?: string | null;
  readonly birthday?: string | null;
  readonly pets?: number | null;
  readonly kids?: number | null;
  readonly comments?: (Comment | null)[] | null;
  readonly relevantCommunities?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly postalCode: string;
  readonly address?: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly communities: AsyncCollection<UserCommunity>;
  readonly selectedCommunity: string;
  readonly posts: AsyncCollection<Post>;
  readonly friends?: string[] | null;
  readonly friendRequests: AsyncCollection<FriendRequest>;
  readonly events: AsyncCollection<Event>;
  readonly itemsForSale: AsyncCollection<ItemForSale>;
  readonly likedPosts: AsyncCollection<UserLikedPosts>;
  readonly likedEvents: AsyncCollection<UserLikedEvents>;
  readonly likedItems: AsyncCollection<UserLikedItems>;
  readonly location?: string | null;
  readonly bio?: string | null;
  readonly profilePic?: string | null;
  readonly pronouns?: string | null;
  readonly contact?: string | null;
  readonly birthday?: string | null;
  readonly pets?: number | null;
  readonly kids?: number | null;
  readonly comments: AsyncCollection<Comment>;
  readonly relevantCommunities?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCommunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Community, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly coordinates: string;
  readonly image?: string | null;
  readonly members?: UserCommunity[] | null;
  readonly posts: Post[];
  readonly events?: (Event | null)[] | null;
  readonly itemsForSale?: (ItemForSale | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Community, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly coordinates: string;
  readonly image?: string | null;
  readonly members: AsyncCollection<UserCommunity>;
  readonly posts: AsyncCollection<Post>;
  readonly events: AsyncCollection<Event>;
  readonly itemsForSale: AsyncCollection<ItemForSale>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Community = LazyLoading extends LazyLoadingDisabled ? EagerCommunity : LazyCommunity

export declare const Community: (new (init: ModelInit<Community>) => Community) & {
  copyOf(source: Community, mutator: (draft: MutableModel<Community>) => MutableModel<Community> | void): Community;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly author: User;
  readonly community: Community;
  readonly images?: (string | null)[] | null;
  readonly content: string;
  readonly likedBy: UserLikedPosts[];
  readonly likeCount?: number | null;
  readonly comments: Comment[];
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userPostsId?: string | null;
  readonly communityPostsId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly author: AsyncItem<User>;
  readonly community: AsyncItem<Community>;
  readonly images?: (string | null)[] | null;
  readonly content: string;
  readonly likedBy: AsyncCollection<UserLikedPosts>;
  readonly likeCount?: number | null;
  readonly comments: AsyncCollection<Comment>;
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userPostsId?: string | null;
  readonly communityPostsId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post: Post;
  readonly author: User;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCommentsId?: string | null;
  readonly postCommentsId?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post: AsyncItem<Post>;
  readonly author: AsyncItem<User>;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCommentsId?: string | null;
  readonly postCommentsId?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly images?: (string | null)[] | null;
  readonly location: string;
  readonly datetime: string;
  readonly community: Community;
  readonly organizer: User;
  readonly likedBy: UserLikedEvents[];
  readonly saveCount?: number | null;
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userEventsId?: string | null;
  readonly communityEventsId?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly images?: (string | null)[] | null;
  readonly location: string;
  readonly datetime: string;
  readonly community: AsyncItem<Community>;
  readonly organizer: AsyncItem<User>;
  readonly likedBy: AsyncCollection<UserLikedEvents>;
  readonly saveCount?: number | null;
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userEventsId?: string | null;
  readonly communityEventsId?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerItemForSale = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ItemForSale, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly images?: (string | null)[] | null;
  readonly contact: string;
  readonly price: number;
  readonly seller: User;
  readonly community: Community;
  readonly likedBy: UserLikedItems[];
  readonly saveCount?: number | null;
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userItemsForSaleId?: string | null;
  readonly communityItemsForSaleId?: string | null;
}

type LazyItemForSale = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ItemForSale, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly images?: (string | null)[] | null;
  readonly contact: string;
  readonly price: number;
  readonly seller: AsyncItem<User>;
  readonly community: AsyncItem<Community>;
  readonly likedBy: AsyncCollection<UserLikedItems>;
  readonly saveCount?: number | null;
  readonly visibility: Visibility | keyof typeof Visibility;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userItemsForSaleId?: string | null;
  readonly communityItemsForSaleId?: string | null;
}

export declare type ItemForSale = LazyLoading extends LazyLoadingDisabled ? EagerItemForSale : LazyItemForSale

export declare const ItemForSale: (new (init: ModelInit<ItemForSale>) => ItemForSale) & {
  copyOf(source: ItemForSale, mutator: (draft: MutableModel<ItemForSale>) => MutableModel<ItemForSale> | void): ItemForSale;
}

type EagerUserCommunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCommunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly communityId?: string | null;
  readonly user: User;
  readonly community: Community;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCommunity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCommunity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly communityId?: string | null;
  readonly user: AsyncItem<User>;
  readonly community: AsyncItem<Community>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCommunity = LazyLoading extends LazyLoadingDisabled ? EagerUserCommunity : LazyUserCommunity

export declare const UserCommunity: (new (init: ModelInit<UserCommunity>) => UserCommunity) & {
  copyOf(source: UserCommunity, mutator: (draft: MutableModel<UserCommunity>) => MutableModel<UserCommunity> | void): UserCommunity;
}

type EagerUserLikedPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly postId?: string | null;
  readonly user: User;
  readonly post: Post;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserLikedPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly postId?: string | null;
  readonly user: AsyncItem<User>;
  readonly post: AsyncItem<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserLikedPosts = LazyLoading extends LazyLoadingDisabled ? EagerUserLikedPosts : LazyUserLikedPosts

export declare const UserLikedPosts: (new (init: ModelInit<UserLikedPosts>) => UserLikedPosts) & {
  copyOf(source: UserLikedPosts, mutator: (draft: MutableModel<UserLikedPosts>) => MutableModel<UserLikedPosts> | void): UserLikedPosts;
}

type EagerUserLikedEvents = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedEvents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly eventId?: string | null;
  readonly user: User;
  readonly event: Event;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserLikedEvents = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedEvents, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly eventId?: string | null;
  readonly user: AsyncItem<User>;
  readonly event: AsyncItem<Event>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserLikedEvents = LazyLoading extends LazyLoadingDisabled ? EagerUserLikedEvents : LazyUserLikedEvents

export declare const UserLikedEvents: (new (init: ModelInit<UserLikedEvents>) => UserLikedEvents) & {
  copyOf(source: UserLikedEvents, mutator: (draft: MutableModel<UserLikedEvents>) => MutableModel<UserLikedEvents> | void): UserLikedEvents;
}

type EagerUserLikedItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly itemForSaleId?: string | null;
  readonly user: User;
  readonly itemForSale: ItemForSale;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserLikedItems = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLikedItems, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly itemForSaleId?: string | null;
  readonly user: AsyncItem<User>;
  readonly itemForSale: AsyncItem<ItemForSale>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserLikedItems = LazyLoading extends LazyLoadingDisabled ? EagerUserLikedItems : LazyUserLikedItems

export declare const UserLikedItems: (new (init: ModelInit<UserLikedItems>) => UserLikedItems) & {
  copyOf(source: UserLikedItems, mutator: (draft: MutableModel<UserLikedItems>) => MutableModel<UserLikedItems> | void): UserLikedItems;
}