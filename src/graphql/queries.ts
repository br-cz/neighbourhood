/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const searchPosts = /* GraphQL */ `query SearchPosts($communityId: ID!, $keyword: String!) {
  searchPosts(communityId: $communityId, keyword: $keyword) {
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
` as GeneratedQuery<
  APITypes.SearchPostsQueryVariables,
  APITypes.SearchPostsQuery
>;
export const searchPeople = /* GraphQL */ `query SearchPeople($communityId: ID!, $keyword: String!) {
  searchPeople(communityId: $communityId, keyword: $keyword) {
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
` as GeneratedQuery<
  APITypes.SearchPeopleQueryVariables,
  APITypes.SearchPeopleQuery
>;
export const getCommunityPosts = /* GraphQL */ `query GetCommunityPosts($communityId: ID!) {
  getCommunityPosts(communityId: $communityId) {
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
` as GeneratedQuery<
  APITypes.GetCommunityPostsQueryVariables,
  APITypes.GetCommunityPostsQuery
>;
export const getCommunityEvents = /* GraphQL */ `query GetCommunityEvents($communityId: ID!) {
  getCommunityEvents(communityId: $communityId) {
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
` as GeneratedQuery<
  APITypes.GetCommunityEventsQueryVariables,
  APITypes.GetCommunityEventsQuery
>;
export const getUserFriends = /* GraphQL */ `query GetUserFriends($userId: ID!) {
  getUserFriends(userId: $userId) {
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
` as GeneratedQuery<
  APITypes.GetUserFriendsQueryVariables,
  APITypes.GetUserFriendsQuery
>;
export const pendingFriendRequests = /* GraphQL */ `query PendingFriendRequests($userId: ID!) {
  pendingFriendRequests(userId: $userId) {
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
` as GeneratedQuery<
  APITypes.PendingFriendRequestsQueryVariables,
  APITypes.PendingFriendRequestsQuery
>;
export const sentFriendRequests = /* GraphQL */ `query SentFriendRequests($userId: ID!) {
  sentFriendRequests(userId: $userId) {
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
` as GeneratedQuery<
  APITypes.SentFriendRequestsQueryVariables,
  APITypes.SentFriendRequestsQuery
>;
export const getFriendRequest = /* GraphQL */ `query GetFriendRequest($id: ID!) {
  getFriendRequest(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetFriendRequestQueryVariables,
  APITypes.GetFriendRequestQuery
>;
export const listFriendRequests = /* GraphQL */ `query ListFriendRequests(
  $filter: ModelFriendRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listFriendRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      senderId
      receiverId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriendRequestsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFriendRequestsQueryVariables,
  APITypes.ListFriendRequestsQuery
>;
export const syncFriendRequests = /* GraphQL */ `query SyncFriendRequests(
  $filter: ModelFriendRequestFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncFriendRequests(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      senderId
      receiverId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userFriendRequestsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncFriendRequestsQueryVariables,
  APITypes.SyncFriendRequestsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
export const getCommunity = /* GraphQL */ `query GetCommunity($id: ID!) {
  getCommunity(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCommunityQueryVariables,
  APITypes.GetCommunityQuery
>;
export const listCommunities = /* GraphQL */ `query ListCommunities(
  $filter: ModelCommunityFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommunitiesQueryVariables,
  APITypes.ListCommunitiesQuery
>;
export const syncCommunities = /* GraphQL */ `query SyncCommunities(
  $filter: ModelCommunityFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncCommunities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCommunitiesQueryVariables,
  APITypes.SyncCommunitiesQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
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
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const syncPosts = /* GraphQL */ `query SyncPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPosts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncPostsQueryVariables, APITypes.SyncPostsQuery>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const syncComments = /* GraphQL */ `query SyncComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncComments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCommentsQueryVariables,
  APITypes.SyncCommentsQuery
>;
export const getEvent = /* GraphQL */ `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
` as GeneratedQuery<APITypes.GetEventQueryVariables, APITypes.GetEventQuery>;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const syncEvents = /* GraphQL */ `query SyncEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEvents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEventsQueryVariables,
  APITypes.SyncEventsQuery
>;
export const getItemForSale = /* GraphQL */ `query GetItemForSale($id: ID!) {
  getItemForSale(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetItemForSaleQueryVariables,
  APITypes.GetItemForSaleQuery
>;
export const listItemForSales = /* GraphQL */ `query ListItemForSales(
  $filter: ModelItemForSaleFilterInput
  $limit: Int
  $nextToken: String
) {
  listItemForSales(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListItemForSalesQueryVariables,
  APITypes.ListItemForSalesQuery
>;
export const syncItemForSales = /* GraphQL */ `query SyncItemForSales(
  $filter: ModelItemForSaleFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncItemForSales(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncItemForSalesQueryVariables,
  APITypes.SyncItemForSalesQuery
>;
export const getUserCommunity = /* GraphQL */ `query GetUserCommunity($id: ID!) {
  getUserCommunity(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserCommunityQueryVariables,
  APITypes.GetUserCommunityQuery
>;
export const listUserCommunities = /* GraphQL */ `query ListUserCommunities(
  $filter: ModelUserCommunityFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserCommunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      communityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserCommunitiesQueryVariables,
  APITypes.ListUserCommunitiesQuery
>;
export const syncUserCommunities = /* GraphQL */ `query SyncUserCommunities(
  $filter: ModelUserCommunityFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUserCommunities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      communityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncUserCommunitiesQueryVariables,
  APITypes.SyncUserCommunitiesQuery
>;
export const getUserLikedPosts = /* GraphQL */ `query GetUserLikedPosts($id: ID!) {
  getUserLikedPosts(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserLikedPostsQueryVariables,
  APITypes.GetUserLikedPostsQuery
>;
export const listUserLikedPosts = /* GraphQL */ `query ListUserLikedPosts(
  $filter: ModelUserLikedPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserLikedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      postId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserLikedPostsQueryVariables,
  APITypes.ListUserLikedPostsQuery
>;
export const syncUserLikedPosts = /* GraphQL */ `query SyncUserLikedPosts(
  $filter: ModelUserLikedPostsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUserLikedPosts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      postId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncUserLikedPostsQueryVariables,
  APITypes.SyncUserLikedPostsQuery
>;
export const getUserLikedEvents = /* GraphQL */ `query GetUserLikedEvents($id: ID!) {
  getUserLikedEvents(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserLikedEventsQueryVariables,
  APITypes.GetUserLikedEventsQuery
>;
export const listUserLikedEvents = /* GraphQL */ `query ListUserLikedEvents(
  $filter: ModelUserLikedEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserLikedEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      eventId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserLikedEventsQueryVariables,
  APITypes.ListUserLikedEventsQuery
>;
export const syncUserLikedEvents = /* GraphQL */ `query SyncUserLikedEvents(
  $filter: ModelUserLikedEventsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUserLikedEvents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      eventId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncUserLikedEventsQueryVariables,
  APITypes.SyncUserLikedEventsQuery
>;
export const getUserLikedItems = /* GraphQL */ `query GetUserLikedItems($id: ID!) {
  getUserLikedItems(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserLikedItemsQueryVariables,
  APITypes.GetUserLikedItemsQuery
>;
export const listUserLikedItems = /* GraphQL */ `query ListUserLikedItems(
  $filter: ModelUserLikedItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserLikedItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      itemForSaleId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserLikedItemsQueryVariables,
  APITypes.ListUserLikedItemsQuery
>;
export const syncUserLikedItems = /* GraphQL */ `query SyncUserLikedItems(
  $filter: ModelUserLikedItemsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUserLikedItems(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      itemForSaleId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncUserLikedItemsQueryVariables,
  APITypes.SyncUserLikedItemsQuery
>;
export const userCommunitiesByUserId = /* GraphQL */ `query UserCommunitiesByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserCommunityFilterInput
  $limit: Int
  $nextToken: String
) {
  userCommunitiesByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      communityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserCommunitiesByUserIdQueryVariables,
  APITypes.UserCommunitiesByUserIdQuery
>;
export const userCommunitiesByCommunityId = /* GraphQL */ `query UserCommunitiesByCommunityId(
  $communityId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserCommunityFilterInput
  $limit: Int
  $nextToken: String
) {
  userCommunitiesByCommunityId(
    communityId: $communityId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      communityId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserCommunitiesByCommunityIdQueryVariables,
  APITypes.UserCommunitiesByCommunityIdQuery
>;
export const userLikedPostsByUserId = /* GraphQL */ `query UserLikedPostsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedPostsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      postId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedPostsByUserIdQueryVariables,
  APITypes.UserLikedPostsByUserIdQuery
>;
export const userLikedPostsByPostId = /* GraphQL */ `query UserLikedPostsByPostId(
  $postId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedPostsByPostId(
    postId: $postId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      postId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedPostsByPostIdQueryVariables,
  APITypes.UserLikedPostsByPostIdQuery
>;
export const userLikedEventsByUserId = /* GraphQL */ `query UserLikedEventsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedEventsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      eventId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedEventsByUserIdQueryVariables,
  APITypes.UserLikedEventsByUserIdQuery
>;
export const userLikedEventsByEventId = /* GraphQL */ `query UserLikedEventsByEventId(
  $eventId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedEventsByEventId(
    eventId: $eventId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      eventId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedEventsByEventIdQueryVariables,
  APITypes.UserLikedEventsByEventIdQuery
>;
export const userLikedItemsByUserId = /* GraphQL */ `query UserLikedItemsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedItemsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      itemForSaleId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedItemsByUserIdQueryVariables,
  APITypes.UserLikedItemsByUserIdQuery
>;
export const userLikedItemsByItemForSaleId = /* GraphQL */ `query UserLikedItemsByItemForSaleId(
  $itemForSaleId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserLikedItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  userLikedItemsByItemForSaleId(
    itemForSaleId: $itemForSaleId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      itemForSaleId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserLikedItemsByItemForSaleIdQueryVariables,
  APITypes.UserLikedItemsByItemForSaleIdQuery
>;
