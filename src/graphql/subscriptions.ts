/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFriendRequest = /* GraphQL */ `subscription OnCreateFriendRequest(
  $filter: ModelSubscriptionFriendRequestFilterInput
) {
  onCreateFriendRequest(filter: $filter) {
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
      relevantCommunities
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnCreateFriendRequestSubscriptionVariables,
  APITypes.OnCreateFriendRequestSubscription
>;
export const onUpdateFriendRequest = /* GraphQL */ `subscription OnUpdateFriendRequest(
  $filter: ModelSubscriptionFriendRequestFilterInput
) {
  onUpdateFriendRequest(filter: $filter) {
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
      relevantCommunities
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnUpdateFriendRequestSubscriptionVariables,
  APITypes.OnUpdateFriendRequestSubscription
>;
export const onDeleteFriendRequest = /* GraphQL */ `subscription OnDeleteFriendRequest(
  $filter: ModelSubscriptionFriendRequestFilterInput
) {
  onDeleteFriendRequest(filter: $filter) {
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
      relevantCommunities
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnDeleteFriendRequestSubscriptionVariables,
  APITypes.OnDeleteFriendRequestSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
    relevantCommunities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
    relevantCommunities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
    relevantCommunities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateCommunity = /* GraphQL */ `subscription OnCreateCommunity($filter: ModelSubscriptionCommunityFilterInput) {
  onCreateCommunity(filter: $filter) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommunitySubscriptionVariables,
  APITypes.OnCreateCommunitySubscription
>;
export const onUpdateCommunity = /* GraphQL */ `subscription OnUpdateCommunity($filter: ModelSubscriptionCommunityFilterInput) {
  onUpdateCommunity(filter: $filter) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommunitySubscriptionVariables,
  APITypes.OnUpdateCommunitySubscription
>;
export const onDeleteCommunity = /* GraphQL */ `subscription OnDeleteCommunity($filter: ModelSubscriptionCommunityFilterInput) {
  onDeleteCommunity(filter: $filter) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommunitySubscriptionVariables,
  APITypes.OnDeleteCommunitySubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
  onCreatePost(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    likeCount
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
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
  onUpdatePost(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    likeCount
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
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
  onDeletePost(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    images
    content
    likedBy {
      nextToken
      startedAt
      __typename
    }
    likeCount
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
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
  onCreateComment(filter: $filter) {
    id
    post {
      id
      images
      content
      likeCount
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
  onUpdateComment(filter: $filter) {
    id
    post {
      id
      images
      content
      likeCount
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
  onDeleteComment(filter: $filter) {
    id
    post {
      id
      images
      content
      likeCount
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
  onCreateEvent(filter: $filter) {
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
      relevantCommunities
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
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
  onUpdateEvent(filter: $filter) {
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
      relevantCommunities
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
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
  onDeleteEvent(filter: $filter) {
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
      relevantCommunities
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
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
export const onCreateItemForSale = /* GraphQL */ `subscription OnCreateItemForSale(
  $filter: ModelSubscriptionItemForSaleFilterInput
) {
  onCreateItemForSale(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnCreateItemForSaleSubscriptionVariables,
  APITypes.OnCreateItemForSaleSubscription
>;
export const onUpdateItemForSale = /* GraphQL */ `subscription OnUpdateItemForSale(
  $filter: ModelSubscriptionItemForSaleFilterInput
) {
  onUpdateItemForSale(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnUpdateItemForSaleSubscriptionVariables,
  APITypes.OnUpdateItemForSaleSubscription
>;
export const onDeleteItemForSale = /* GraphQL */ `subscription OnDeleteItemForSale(
  $filter: ModelSubscriptionItemForSaleFilterInput
) {
  onDeleteItemForSale(filter: $filter) {
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
      relevantCommunities
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
      __typename
    }
    likedBy {
      nextToken
      startedAt
      __typename
    }
    saveCount
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
` as GeneratedSubscription<
  APITypes.OnDeleteItemForSaleSubscriptionVariables,
  APITypes.OnDeleteItemForSaleSubscription
>;
export const onCreateUserCommunity = /* GraphQL */ `subscription OnCreateUserCommunity(
  $filter: ModelSubscriptionUserCommunityFilterInput
) {
  onCreateUserCommunity(filter: $filter) {
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnCreateUserCommunitySubscriptionVariables,
  APITypes.OnCreateUserCommunitySubscription
>;
export const onUpdateUserCommunity = /* GraphQL */ `subscription OnUpdateUserCommunity(
  $filter: ModelSubscriptionUserCommunityFilterInput
) {
  onUpdateUserCommunity(filter: $filter) {
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserCommunitySubscriptionVariables,
  APITypes.OnUpdateUserCommunitySubscription
>;
export const onDeleteUserCommunity = /* GraphQL */ `subscription OnDeleteUserCommunity(
  $filter: ModelSubscriptionUserCommunityFilterInput
) {
  onDeleteUserCommunity(filter: $filter) {
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
      relevantCommunities
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserCommunitySubscriptionVariables,
  APITypes.OnDeleteUserCommunitySubscription
>;
export const onCreateUserLikedPosts = /* GraphQL */ `subscription OnCreateUserLikedPosts(
  $filter: ModelSubscriptionUserLikedPostsFilterInput
) {
  onCreateUserLikedPosts(filter: $filter) {
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
      relevantCommunities
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
      likeCount
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
` as GeneratedSubscription<
  APITypes.OnCreateUserLikedPostsSubscriptionVariables,
  APITypes.OnCreateUserLikedPostsSubscription
>;
export const onUpdateUserLikedPosts = /* GraphQL */ `subscription OnUpdateUserLikedPosts(
  $filter: ModelSubscriptionUserLikedPostsFilterInput
) {
  onUpdateUserLikedPosts(filter: $filter) {
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
      relevantCommunities
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
      likeCount
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserLikedPostsSubscriptionVariables,
  APITypes.OnUpdateUserLikedPostsSubscription
>;
export const onDeleteUserLikedPosts = /* GraphQL */ `subscription OnDeleteUserLikedPosts(
  $filter: ModelSubscriptionUserLikedPostsFilterInput
) {
  onDeleteUserLikedPosts(filter: $filter) {
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
      relevantCommunities
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
      likeCount
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserLikedPostsSubscriptionVariables,
  APITypes.OnDeleteUserLikedPostsSubscription
>;
export const onCreateUserLikedEvents = /* GraphQL */ `subscription OnCreateUserLikedEvents(
  $filter: ModelSubscriptionUserLikedEventsFilterInput
) {
  onCreateUserLikedEvents(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnCreateUserLikedEventsSubscriptionVariables,
  APITypes.OnCreateUserLikedEventsSubscription
>;
export const onUpdateUserLikedEvents = /* GraphQL */ `subscription OnUpdateUserLikedEvents(
  $filter: ModelSubscriptionUserLikedEventsFilterInput
) {
  onUpdateUserLikedEvents(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserLikedEventsSubscriptionVariables,
  APITypes.OnUpdateUserLikedEventsSubscription
>;
export const onDeleteUserLikedEvents = /* GraphQL */ `subscription OnDeleteUserLikedEvents(
  $filter: ModelSubscriptionUserLikedEventsFilterInput
) {
  onDeleteUserLikedEvents(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserLikedEventsSubscriptionVariables,
  APITypes.OnDeleteUserLikedEventsSubscription
>;
export const onCreateUserLikedItems = /* GraphQL */ `subscription OnCreateUserLikedItems(
  $filter: ModelSubscriptionUserLikedItemsFilterInput
) {
  onCreateUserLikedItems(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnCreateUserLikedItemsSubscriptionVariables,
  APITypes.OnCreateUserLikedItemsSubscription
>;
export const onUpdateUserLikedItems = /* GraphQL */ `subscription OnUpdateUserLikedItems(
  $filter: ModelSubscriptionUserLikedItemsFilterInput
) {
  onUpdateUserLikedItems(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserLikedItemsSubscriptionVariables,
  APITypes.OnUpdateUserLikedItemsSubscription
>;
export const onDeleteUserLikedItems = /* GraphQL */ `subscription OnDeleteUserLikedItems(
  $filter: ModelSubscriptionUserLikedItemsFilterInput
) {
  onDeleteUserLikedItems(filter: $filter) {
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
      relevantCommunities
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
      saveCount
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserLikedItemsSubscriptionVariables,
  APITypes.OnDeleteUserLikedItemsSubscription
>;
