enum FriendRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

enum PostType {
  THOUGHT = 'THOUGHT',
  EVENT_ANNOUNCEMENT = 'EVENT_ANNOUNCEMENT',
  ITEM_FOR_SALE = 'ITEM_FOR_SALE',
}

enum Visibility {
  PUBLIC = 'PUBLIC',
  FRIENDS_ONLY = 'FRIENDS_ONLY',
  FRIENDS_OF_FRIENDS = 'FRIENDS_OF_FRIENDS',
  PRIVATE = 'PRIVATE',
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
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

interface Community {
  id: string;
  name: string;
  location: string;
  postalCode: string;
  image: string;
  members: User[];
  posts: Post[];
}

interface Post {
  id: string;
  author: User;
  community: Community;
  images: string[];
  content: string;
  postType: PostType;
  likedBy: User[];
  comments: Comment[];
  visibility: Visibility;
}

interface Comment {
  id: string;
  post: Post;
  author: User;
  content: string;
}

interface Event {
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

interface ItemForSale {
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

interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: FriendRequestStatus;
}
