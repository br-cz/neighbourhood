import { generateClient } from '@aws-amplify/api';
import { getPost, listComments } from '@/src/graphql/queries';
import { createPost, createComment, updatePost } from '@/src/graphql/mutations';
import { CommentDataInput, PostDataInput } from '@/types/types';
import { HttpError } from '@/src/models/error/HttpError';

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
              }
            }
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
