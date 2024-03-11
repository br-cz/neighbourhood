/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const switchCommunity = /* GraphQL */ `mutation SwitchCommunity($userId: ID!, $communityId: ID!) {
  switchCommunity(userId: $userId, communityId: $communityId) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SwitchCommunityMutationVariables,
  APITypes.SwitchCommunityMutation
>;
export const joinCommunity = /* GraphQL */ `mutation JoinCommunity($userId: ID!, $communityId: ID!) {
  joinCommunity(userId: $userId, communityId: $communityId) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.JoinCommunityMutationVariables,
  APITypes.JoinCommunityMutation
>;
export const likePost = /* GraphQL */ `mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    id
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    comments {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userPostsId
    communityPostsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.LikePostMutationVariables,
  APITypes.LikePostMutation
>;
export const unlikePost = /* GraphQL */ `mutation UnlikePost($postId: ID!) {
  unlikePost(postId: $postId) {
    id
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    comments {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userPostsId
    communityPostsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UnlikePostMutationVariables,
  APITypes.UnlikePostMutation
>;
export const commentOnPost = /* GraphQL */ `mutation CommentOnPost($postId: ID!, $authorId: ID!, $content: String!) {
  commentOnPost(postId: $postId, authorId: $authorId, content: $content) {
    id
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    content
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userCommentsId
    postCommentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CommentOnPostMutationVariables,
  APITypes.CommentOnPostMutation
>;
export const sellItem = /* GraphQL */ `mutation SellItem(
  $title: String!
  $description: String!
  $price: Float!
  $sellerId: ID!
  $communityId: ID!
  $images: [String]
  $contact: String!
  $visibility: Visibility!
) {
  sellItem(
    title: $title
    description: $description
    price: $price
    sellerId: $sellerId
    communityId: $communityId
    images: $images
    contact: $contact
    visibility: $visibility
  ) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SellItemMutationVariables,
  APITypes.SellItemMutation
>;
export const addFriend = /* GraphQL */ `mutation AddFriend($userId: ID!, $friendId: ID!) {
  addFriend(userId: $userId, friendId: $friendId) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddFriendMutationVariables,
  APITypes.AddFriendMutation
>;
export const removeFriend = /* GraphQL */ `mutation RemoveFriend($userId: ID!, $friendId: ID!) {
  removeFriend(userId: $userId, friendId: $friendId)
}
` as GeneratedMutation<
  APITypes.RemoveFriendMutationVariables,
  APITypes.RemoveFriendMutation
>;
export const likeEvent = /* GraphQL */ `mutation LikeEvent($userId: ID!, $eventId: ID!) {
  likeEvent(userId: $userId, eventId: $eventId) {
    id
    name
    description
    images
    location
    datetime
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    organizer {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userEventsId
    communityEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.LikeEventMutationVariables,
  APITypes.LikeEventMutation
>;
export const unlikeEvent = /* GraphQL */ `mutation UnlikeEvent($userId: ID!, $eventId: ID!) {
  unlikeEvent(userId: $userId, eventId: $eventId) {
    id
    name
    description
    images
    location
    datetime
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    organizer {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userEventsId
    communityEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UnlikeEventMutationVariables,
  APITypes.UnlikeEventMutation
>;
export const likeItemForSale = /* GraphQL */ `mutation LikeItemForSale($userId: ID!, $itemId: ID!) {
  likeItemForSale(userId: $userId, itemId: $itemId) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.LikeItemForSaleMutationVariables,
  APITypes.LikeItemForSaleMutation
>;
export const unlikeItemForSale = /* GraphQL */ `mutation UnlikeItemForSale($userId: ID!, $itemId: ID!) {
  unlikeItemForSale(userId: $userId, itemId: $itemId) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UnlikeItemForSaleMutationVariables,
  APITypes.UnlikeItemForSaleMutation
>;
export const sendFriendRequest = /* GraphQL */ `mutation SendFriendRequest($senderId: ID!, $receiverId: ID!) {
  sendFriendRequest(senderId: $senderId, receiverId: $receiverId) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendFriendRequestMutationVariables,
  APITypes.SendFriendRequestMutation
>;
export const acceptFriendRequest = /* GraphQL */ `mutation AcceptFriendRequest($requestId: ID!) {
  acceptFriendRequest(requestId: $requestId) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AcceptFriendRequestMutationVariables,
  APITypes.AcceptFriendRequestMutation
>;
export const declineFriendRequest = /* GraphQL */ `mutation DeclineFriendRequest($requestId: ID!) {
  declineFriendRequest(requestId: $requestId) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeclineFriendRequestMutationVariables,
  APITypes.DeclineFriendRequestMutation
>;
export const createFriendRequest = /* GraphQL */ `mutation CreateFriendRequest(
  $input: CreateFriendRequestInput!
  $condition: ModelFriendRequestConditionInput
) {
  createFriendRequest(input: $input, condition: $condition) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFriendRequestMutationVariables,
  APITypes.CreateFriendRequestMutation
>;
export const updateFriendRequest = /* GraphQL */ `mutation UpdateFriendRequest(
  $input: UpdateFriendRequestInput!
  $condition: ModelFriendRequestConditionInput
) {
  updateFriendRequest(input: $input, condition: $condition) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFriendRequestMutationVariables,
  APITypes.UpdateFriendRequestMutation
>;
export const deleteFriendRequest = /* GraphQL */ `mutation DeleteFriendRequest(
  $input: DeleteFriendRequestInput!
  $condition: ModelFriendRequestConditionInput
) {
  deleteFriendRequest(input: $input, condition: $condition) {
    id
    senderId
    receiverId
    sender {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    receiver {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userFriendRequestsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFriendRequestMutationVariables,
  APITypes.DeleteFriendRequestMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    username
    email
    postalCode
    address
    firstName
    lastName
    communities {
      nextToken
      startedAt
      __typename
    }
    selectedCommunity
    posts {
      nextToken
      startedAt
      __typename
    }
    friends
    friendRequests {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    likedPosts {
      nextToken
      startedAt
      __typename
    }
    likedEvents {
      nextToken
      startedAt
      __typename
    }
    likedItems {
      nextToken
      startedAt
      __typename
    }
    location
    bio
    profilePic
    pronouns
    contact
    birthday
    pets
    kids
    comments {
      nextToken
      startedAt
      __typename
    }
    relevantCommunities {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createCommunity = /* GraphQL */ `mutation CreateCommunity(
  $input: CreateCommunityInput!
  $condition: ModelCommunityConditionInput
) {
  createCommunity(input: $input, condition: $condition) {
    id
    name
    location
    coordinates
    image
    members {
      nextToken
      startedAt
      __typename
    }
    posts {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userRelevantCommunitiesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommunityMutationVariables,
  APITypes.CreateCommunityMutation
>;
export const updateCommunity = /* GraphQL */ `mutation UpdateCommunity(
  $input: UpdateCommunityInput!
  $condition: ModelCommunityConditionInput
) {
  updateCommunity(input: $input, condition: $condition) {
    id
    name
    location
    coordinates
    image
    members {
      nextToken
      startedAt
      __typename
    }
    posts {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userRelevantCommunitiesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommunityMutationVariables,
  APITypes.UpdateCommunityMutation
>;
export const deleteCommunity = /* GraphQL */ `mutation DeleteCommunity(
  $input: DeleteCommunityInput!
  $condition: ModelCommunityConditionInput
) {
  deleteCommunity(input: $input, condition: $condition) {
    id
    name
    location
    coordinates
    image
    members {
      nextToken
      startedAt
      __typename
    }
    posts {
      nextToken
      startedAt
      __typename
    }
    events {
      nextToken
      startedAt
      __typename
    }
    itemsForSale {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userRelevantCommunitiesId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommunityMutationVariables,
  APITypes.DeleteCommunityMutation
>;
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
    id
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    comments {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userPostsId
    communityPostsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
    id
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    comments {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userPostsId
    communityPostsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    id
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    comments {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userPostsId
    communityPostsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    content
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userCommentsId
    postCommentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    content
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userCommentsId
    postCommentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    author {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    content
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userCommentsId
    postCommentsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createEvent = /* GraphQL */ `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
    id
    name
    description
    images
    location
    datetime
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    organizer {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userEventsId
    communityEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEventMutationVariables,
  APITypes.CreateEventMutation
>;
export const updateEvent = /* GraphQL */ `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
    id
    name
    description
    images
    location
    datetime
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    organizer {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userEventsId
    communityEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateEventMutationVariables,
  APITypes.UpdateEventMutation
>;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
    id
    name
    description
    images
    location
    datetime
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    organizer {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userEventsId
    communityEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEventMutationVariables,
  APITypes.DeleteEventMutation
>;
export const createItemForSale = /* GraphQL */ `mutation CreateItemForSale(
  $input: CreateItemForSaleInput!
  $condition: ModelItemForSaleConditionInput
) {
  createItemForSale(input: $input, condition: $condition) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateItemForSaleMutationVariables,
  APITypes.CreateItemForSaleMutation
>;
export const updateItemForSale = /* GraphQL */ `mutation UpdateItemForSale(
  $input: UpdateItemForSaleInput!
  $condition: ModelItemForSaleConditionInput
) {
  updateItemForSale(input: $input, condition: $condition) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateItemForSaleMutationVariables,
  APITypes.UpdateItemForSaleMutation
>;
export const deleteItemForSale = /* GraphQL */ `mutation DeleteItemForSale(
  $input: DeleteItemForSaleInput!
  $condition: ModelItemForSaleConditionInput
) {
  deleteItemForSale(input: $input, condition: $condition) {
    id
    title
    description
    images
    contact
    price
    seller {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    visibility
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userItemsForSaleId
    communityItemsForSaleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteItemForSaleMutationVariables,
  APITypes.DeleteItemForSaleMutation
>;
export const createUserCommunity = /* GraphQL */ `mutation CreateUserCommunity(
  $input: CreateUserCommunityInput!
  $condition: ModelUserCommunityConditionInput
) {
  createUserCommunity(input: $input, condition: $condition) {
    id
    userId
    communityId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserCommunityMutationVariables,
  APITypes.CreateUserCommunityMutation
>;
export const updateUserCommunity = /* GraphQL */ `mutation UpdateUserCommunity(
  $input: UpdateUserCommunityInput!
  $condition: ModelUserCommunityConditionInput
) {
  updateUserCommunity(input: $input, condition: $condition) {
    id
    userId
    communityId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserCommunityMutationVariables,
  APITypes.UpdateUserCommunityMutation
>;
export const deleteUserCommunity = /* GraphQL */ `mutation DeleteUserCommunity(
  $input: DeleteUserCommunityInput!
  $condition: ModelUserCommunityConditionInput
) {
  deleteUserCommunity(input: $input, condition: $condition) {
    id
    userId
    communityId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    community {
      id
      name
      location
      coordinates
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userRelevantCommunitiesId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserCommunityMutationVariables,
  APITypes.DeleteUserCommunityMutation
>;
export const createUserLikedPosts = /* GraphQL */ `mutation CreateUserLikedPosts(
  $input: CreateUserLikedPostsInput!
  $condition: ModelUserLikedPostsConditionInput
) {
  createUserLikedPosts(input: $input, condition: $condition) {
    id
    userId
    postId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserLikedPostsMutationVariables,
  APITypes.CreateUserLikedPostsMutation
>;
export const updateUserLikedPosts = /* GraphQL */ `mutation UpdateUserLikedPosts(
  $input: UpdateUserLikedPostsInput!
  $condition: ModelUserLikedPostsConditionInput
) {
  updateUserLikedPosts(input: $input, condition: $condition) {
    id
    userId
    postId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserLikedPostsMutationVariables,
  APITypes.UpdateUserLikedPostsMutation
>;
export const deleteUserLikedPosts = /* GraphQL */ `mutation DeleteUserLikedPosts(
  $input: DeleteUserLikedPostsInput!
  $condition: ModelUserLikedPostsConditionInput
) {
  deleteUserLikedPosts(input: $input, condition: $condition) {
    id
    userId
    postId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    post {
      id
      images
      content
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPostsId
      communityPostsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserLikedPostsMutationVariables,
  APITypes.DeleteUserLikedPostsMutation
>;
export const createUserLikedEvents = /* GraphQL */ `mutation CreateUserLikedEvents(
  $input: CreateUserLikedEventsInput!
  $condition: ModelUserLikedEventsConditionInput
) {
  createUserLikedEvents(input: $input, condition: $condition) {
    id
    userId
    eventId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    event {
      id
      name
      description
      images
      location
      datetime
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userEventsId
      communityEventsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserLikedEventsMutationVariables,
  APITypes.CreateUserLikedEventsMutation
>;
export const updateUserLikedEvents = /* GraphQL */ `mutation UpdateUserLikedEvents(
  $input: UpdateUserLikedEventsInput!
  $condition: ModelUserLikedEventsConditionInput
) {
  updateUserLikedEvents(input: $input, condition: $condition) {
    id
    userId
    eventId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    event {
      id
      name
      description
      images
      location
      datetime
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userEventsId
      communityEventsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserLikedEventsMutationVariables,
  APITypes.UpdateUserLikedEventsMutation
>;
export const deleteUserLikedEvents = /* GraphQL */ `mutation DeleteUserLikedEvents(
  $input: DeleteUserLikedEventsInput!
  $condition: ModelUserLikedEventsConditionInput
) {
  deleteUserLikedEvents(input: $input, condition: $condition) {
    id
    userId
    eventId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    event {
      id
      name
      description
      images
      location
      datetime
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userEventsId
      communityEventsId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserLikedEventsMutationVariables,
  APITypes.DeleteUserLikedEventsMutation
>;
export const createUserLikedItems = /* GraphQL */ `mutation CreateUserLikedItems(
  $input: CreateUserLikedItemsInput!
  $condition: ModelUserLikedItemsConditionInput
) {
  createUserLikedItems(input: $input, condition: $condition) {
    id
    userId
    itemForSaleId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    itemForSale {
      id
      title
      description
      images
      contact
      price
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userItemsForSaleId
      communityItemsForSaleId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserLikedItemsMutationVariables,
  APITypes.CreateUserLikedItemsMutation
>;
export const updateUserLikedItems = /* GraphQL */ `mutation UpdateUserLikedItems(
  $input: UpdateUserLikedItemsInput!
  $condition: ModelUserLikedItemsConditionInput
) {
  updateUserLikedItems(input: $input, condition: $condition) {
    id
    userId
    itemForSaleId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    itemForSale {
      id
      title
      description
      images
      contact
      price
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userItemsForSaleId
      communityItemsForSaleId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserLikedItemsMutationVariables,
  APITypes.UpdateUserLikedItemsMutation
>;
export const deleteUserLikedItems = /* GraphQL */ `mutation DeleteUserLikedItems(
  $input: DeleteUserLikedItemsInput!
  $condition: ModelUserLikedItemsConditionInput
) {
  deleteUserLikedItems(input: $input, condition: $condition) {
    id
    userId
    itemForSaleId
    user {
      id
      username
      email
      postalCode
      address
      firstName
      lastName
      selectedCommunity
      friends
      location
      bio
      profilePic
      pronouns
      contact
      birthday
      pets
      kids
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    itemForSale {
      id
      title
      description
      images
      contact
      price
      visibility
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userItemsForSaleId
      communityItemsForSaleId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserLikedItemsMutationVariables,
  APITypes.DeleteUserLikedItemsMutation
>;
