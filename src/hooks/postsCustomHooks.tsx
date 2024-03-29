import { useState, useEffect } from 'react';
import {
  getCommunityPostsAPI,
  createNewPostAPI,
  createNewCommentAPI,
  listUserLikedPostsAPI,
  deleteLikeAPI,
  createLikeAPI,
} from '../api/services/post';
import { getCurrentUser, getCurrentUserID } from './usersCustomHooks';
import { Post, CommentDataInput, PostDataInput, Visibility } from '@/types/types';
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
        likeCount: 0,
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
        const visiblePosts = jsonPosts.data.getCommunity.posts.items.filter(
          (post: Post) =>
            post.visibility === Visibility.PUBLIC ||
            post.author.id === user!.id ||
            (post.visibility === Visibility.FRIENDS_ONLY && user!.friends?.includes(post.author.id))
        );
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

export const usePostLikes = (postId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userPostLike, setUserPostLike] = useState<any>(null);
  const [error, setError] = useState('');
  const userId = getCurrentUserID();

  const fetchLikeStatus = async () => {
    try {
      const likesResponse = await listUserLikedPostsAPI();
      const userLike = likesResponse.find(
        (item) => item.postId === postId && item.userId === userId && !item._deleted
      );
      setIsLiked(!!userLike);
      setUserPostLike(userLike);
    } catch (err) {
      console.error('Error fetching like status:', err);
      setError('Failed to fetch like status');
    }
  };

  useEffect(() => {
    fetchLikeStatus();
  }, [postId, userId]);

  const likePost = async () => {
    if (!isLiked) {
      try {
        await createLikeAPI(postId);
        fetchLikeStatus();
      } catch (err) {
        console.error('Error liking post:', err);
        setError('Failed to like post');
      }
    }
  };

  const unlikePost = async () => {
    if (isLiked && userPostLike) {
      try {
        await deleteLikeAPI(userPostLike);
        fetchLikeStatus();
      } catch (err) {
        console.error('Error unliking post:', err);
        setError('Failed to unlike post');
      }
    }
  };

  return { isLiked, likePost, unlikePost, error };
};

export const useUserLikes = () => {
  const [userLikes, setUserLikes] = useState(new Map());
  const userId = getCurrentUserID();

  useEffect(() => {
    const fetchUserLikes = async () => {
      try {
        const likesResponse = await listUserLikedPostsAPI();
        const userLikesMap = new Map();
        likesResponse.forEach((like) => {
          if (like.userId === userId && !like._deleted) {
            userLikesMap.set(like.postId, true);
          }
        });
        setUserLikes(userLikesMap);
      } catch (error) {
        console.error('Failed to fetch user likes:', error);
      }
    };

    fetchUserLikes();
  }, [userId]);

  return { userLikes };
};
