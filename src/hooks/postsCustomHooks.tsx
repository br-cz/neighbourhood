import { useState, useEffect } from 'react';
import { getCommunityPostsAPI, createNewPostAPI } from '../api/services/post';
import { getCurrentUserID } from './usersCustomHooks';
import { Post, PostDataInput } from '@/types/types';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUser } from './usersCustomHooks';

export const useCreatePost = () => {
  const [error, setError] = useState<string | undefined>();

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
      const post = await createNewPostAPI(newPostData);
      console.log('Post created:', post);
      return post;
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err);
      return err;
    }
  };

  return { handleCreatePost, error };
};

export const useFetchPosts = (refresh: boolean = false) => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const communityId = getCurrentCommunityID();
        const response = await getCommunityPostsAPI(communityId);
        const jsonPosts = JSON.parse(JSON.stringify(response));
        const visiblePosts = jsonPosts.data.getCommunity.posts.items.filter((post: Post) => {
          return (
            post.visibility === 'PUBLIC' ||
            post.author.id == user!.id ||
            (post.visibility === 'PRIVATE' && user!.friends!.includes(post.author.id))
          );
        });
        setPosts(visiblePosts);
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
