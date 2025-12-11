import React, { createContext, useState, useContext } from 'react';
import { Post } from '../types/post';
import { fetchPostsApi, createPostApi, updatePostApi } from '../services/posts';
import { savePostsCache, loadPostsCache } from '../utils/storage';

type PostsCtx = {
  posts: Post[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (p: Partial<Post>) => Promise<Post | undefined>;
  updatePost: (id: number, p: Partial<Post>) => Promise<Post | undefined>;
  getPostById: (id: number) => Post | undefined;
  toggleFavorite: (id: number) => void;
};

const PostsContext = createContext<PostsCtx | undefined>(undefined);

export const PostsProvider: React.FC<{ children: any }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const cached = await loadPostsCache();
      if (cached && Array.isArray(cached)) setPosts(cached);
      const fresh = await fetchPostsApi();
      const mapped = fresh.map((p) => ({
        ...p,
        favorite: cached?.find((c: any) => c.id === p.id)?.favorite || false,
        image: `https://picsum.photos/seed/${p.id}/400/300`,
      }));
      setPosts(mapped);
      await savePostsCache(mapped);
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (p: Partial<Post>) => {
    try {
      const res = await createPostApi(p);
      const newPost: Post = {
        id: Date.now(),
        title: p.title || '',
        body: p.body || '',
        image: `https://picsum.photos/400/300?random=${Date.now()}`,
      };
      const updated = [newPost, ...posts];
      setPosts(updated);
      await savePostsCache(updated);
      return newPost;
    } catch (e) {
      return undefined;
    }
  };

  const updatePost = async (id: number, p: Partial<Post>) => {
    try {
      await updatePostApi(id, p);
      const updated = posts.map((x) => (x.id === id ? { ...x, ...p } : x));
      setPosts(updated);
      await savePostsCache(updated);
      return updated.find((x) => x.id === id);
    } catch (e) {
      return undefined;
    }
  };

  const getPostById = (id: number) => posts.find((p) => p.id === id);

  const toggleFavorite = (id: number) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p,
    );
    setPosts(updated);
    savePostsCache(updated);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        createPost,
        updatePost,
        getPostById,
        toggleFavorite,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const ctx = useContext(PostsContext);
  if (!ctx)
    throw new Error('usePostsContext must be used inside PostsProvider');
  return ctx;
};
