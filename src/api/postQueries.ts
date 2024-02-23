import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentCommunityID, getCurrentUserID } from '@/src/api/appQueries';
import { getPost } from '../graphql/queries';
import { createPost } from '../graphql/mutations';
import { PostDataInput } from '@/types/types';

const client = generateClient();

export const getPostByID = async (postId: string) => {
  const post = await client.graphql({
    query: getPost,
    variables: { id: postId },
  });
  return post.data.getPost;
};

export const useFetchPosts = (refresh: boolean = false) => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

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
          }
        }
      }
    }
  `;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const communityId = getCurrentCommunityID();
        const response = await client.graphql({
          query: getCommunityPosts,
          variables: { communityId },
        });
        const jsonPosts = JSON.parse(JSON.stringify(response));
        setPosts(jsonPosts.data.getCommunity.posts.items);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refresh]);

  return { posts, loading, error };
};

export const useCreatePost = () => {
  const handleCreatePost = async (
    postData: Omit<PostDataInput, 'userPostsId' | 'communityPostsId'>
  ) => {
    try {
      const userId = getCurrentUserID();
      const communityId = getCurrentCommunityID();
      const newPostData: PostDataInput = {
        ...postData,
        userPostsId: userId,
        communityPostsId: communityId,
      };
      const post = await client.graphql({
        query: createPost,
        variables: { input: newPostData },
      });
      console.log('Post created:', post.data.createPost);
      return post.data.createPost;
    } catch (err: any) {
      console.error('Error creating post:', err);
      return err;
    }
  };
  return { handleCreatePost };
};
