import { useState, useEffect } from 'react';
import { getCommunityPostsAPI, createNewPostAPI, createNewCommentAPI } from '../api/services/post';
import { getCurrentUserID } from './usersCustomHooks';
import { CommentDataInput, PostDataInput } from '@/types/types';
import { getCurrentCommunityID } from './communityCustomHooks';

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
        const communityId = getCurrentCommunityID();
        const response = await getCommunityPostsAPI(communityId);
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

export const useCreateComment = () => {
  const [error, setError] = useState<string | undefined>();

  const handleCreateComment = async (commentData: Omit<CommentDataInput, 'userCommentsId'>) => {
    try {
      const userId = getCurrentUserID();
      const newCommentData: CommentDataInput = {
        ...commentData,
        userCommentsId: userId,
      };
      const comment = await createNewCommentAPI(newCommentData);
      console.log('Comment created:', comment);
      return comment;
    } catch (err: any) {
      console.error('Error creating comment:', err);
      setError(err);
      return err;
    }
  };

  return { handleCreateComment, error };
};
