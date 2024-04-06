import { generateClient } from '@aws-amplify/api';
import { getPost, listComments, listUserLikedPosts } from '@/src/graphql/queries';
import {
  createPost,
  createComment,
  updatePost,
  createUserLikedPosts,
  deleteUserLikedPosts,
  deletePost,
  deleteComment,
} from '@/src/graphql/mutations';
import { CommentDataInput, PostDataInput, Post, CommentItem } from '@/types/types';
import { HttpError } from '@/src/models/error/HttpError';
import { UserLikedPosts } from '@/src/API';
import { getCurrentUserID } from '@/src/hooks/usersCustomHooks';

const client = generateClient();

export const getPostAPI = async (postId: string) => {
  try {
    const post = await client.graphql({
      query: getPost,
      variables: { id: postId },
    });
    return post.data.getPost;
  } catch (error: any) {
    throw new HttpError(`Error retrieving post: ${error.message}`, error.statusCode || 500);
  }
};

export const createNewPostAPI = async (postData: PostDataInput) => {
  try {
    const post = await client.graphql({
      query: createPost,
      variables: { input: postData },
    });
    return post.data.createPost;
  } catch (error: any) {
    throw new HttpError(`Error creating post: ${error.message}`, error.statusCode || 500);
  }
};

export const getCommunityPostsAPI = async (communityId: string) => {
  const getCommunityPosts = /* GraphQL */ `
    query GetCommunityPosts($communityId: ID!) {
      getCommunity(id: $communityId) {
        id
        posts {
          items {
            id
            author {
              id
              username
              firstName
              lastName
              profilePic
            }
            content
            updatedAt
            createdAt
            userPostsId
            visibility
            likedBy {
              items {
                userId
                user {
                  username
                  profilePic
                }
              }
            }
            likeCount
            comments {
              items {
                content
                author {
                  id
                  firstName
                  lastName
                  profilePic
                }
                id
                createdAt
                _version
                _deleted
              }
            }
            _version
            _deleted
          }
        }
      }
    }
  `;
  try {
    const response = await client.graphql({
      query: getCommunityPosts,
      variables: { communityId },
    });
    return response;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving community posts: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const deletePostAPI = async (post: Post) => {
  try {
    const response = await client.graphql({
      query: deletePost,
      variables: {
        input: {
          id: post.id,
          _version: post._version,
        },
      },
    });
    console.log('Post deleted successfully:', response.data.deletePost);
    return response.data.deletePost;
  } catch (error: any) {
    throw new HttpError(`Error deleting post: ${error.message}`, error.statusCode || 500);
  }
};

export const listUserLikedPostsAPI = async () => {
  try {
    const response = await client.graphql({
      query: listUserLikedPosts,
    });
    const filteredResponse = response.data.listUserLikedPosts.items.filter(
      (item: any) => !item._deleted
    );
    return filteredResponse;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving user liked posts: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const createNewCommentAPI = async (commentData: CommentDataInput) => {
  try {
    const comment = await client.graphql({
      query: createComment,
      variables: { input: commentData },
    });
    return comment.data.createComment;
  } catch (error: any) {
    throw new HttpError(`Error creating comment: ${error.message}`, error.statusCode || 500);
  }
};

export const deleteCommentAPI = async (comment: CommentItem) => {
  try {
    const response = await client.graphql({
      query: deleteComment,
      variables: {
        input: {
          id: comment.id,
          _version: comment._version,
        },
      },
    });
    console.log('Comment deleted successfully:', response.data.deleteComment);
    return response.data.deleteComment;
  } catch (error: any) {
    throw new HttpError(`Error deleting comment: ${error.message}`, error.statusCode || 500);
  }
};

export const getAllCommentsAPI = async () => {
  try {
    const response = await client.graphql({ query: listComments });
    return response;
  } catch (error: any) {
    throw new HttpError(error.message, error.statusCode || 500);
  }
};

export const updatePostImageAPI = async (postId: string, image: string, _version: number) => {
  try {
    const updatedPost = await client.graphql({
      query: updatePost,
      variables: {
        input: {
          id: postId,
          images: [image],
          _version,
        },
      },
    });
    console.log('User updated successfully:', updatedPost.data.updatePost);
    return updatedPost.data.updatePost;
  } catch (error: any) {
    throw new HttpError(`Error updating post image: ${error.message}`, error.statusCode || 500);
  }
};

export const updatePostLikeCountAPI = async (postId: string, adjustment: number) => {
  try {
    const postResponse = await getPostAPI(postId);
    if (!postResponse) {
      throw new Error('Post not found');
    }
    const { _version, likeCount = 0 } = postResponse;
    const newLikeCount = Math.max(likeCount! + adjustment, 0);
    const updatedPost = await client.graphql({
      query: updatePost,
      variables: {
        input: {
          id: postId,
          likeCount: newLikeCount,
          _version,
        },
      },
    });
    console.log('Post updated successfully:', updatedPost.data.updatePost);
    return updatedPost.data.updatePost;
  } catch (error: any) {
    throw new HttpError(
      `Error updating post like count: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const createLikeAPI = async (postId: string) => {
  const userId = getCurrentUserID();
  try {
    const createUserLikedPostsResponse = await client.graphql({
      query: createUserLikedPosts,
      variables: {
        input: {
          postId,
          userId,
        },
      },
    });
    await updatePostLikeCountAPI(postId, 1);
    return createUserLikedPostsResponse.data.createUserLikedPosts;
  } catch (error: any) {
    throw new HttpError(
      `Error creating user post connection: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const deleteLikeAPI = async (like: UserLikedPosts) => {
  try {
    const deleteUserLikedPostsResponse = await client.graphql({
      query: deleteUserLikedPosts,
      variables: {
        input: {
          id: like.id,
          _version: like._version,
        },
      },
    });
    await updatePostLikeCountAPI(like.postId, -1);
    return deleteUserLikedPostsResponse.data.deleteUserLikedPosts;
  } catch (error: any) {
    throw new HttpError(`Error deleting like: ${error.message}`, error.statusCode || 500);
  }
};
