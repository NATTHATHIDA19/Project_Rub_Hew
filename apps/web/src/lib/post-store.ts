export type PostType = "carry" | "request";

export type StoredPost = {
  id: string;
  type: PostType;
  authorName?: string;
  title: string;
  detail: string;
  location: string;
  deadline: string;
  budget: string;
  category: string;
  contact: string;
  createdAt: string;
};

export const POSTS_STORAGE_KEY = "rubHewPosts";

export const getStoredPosts = () => {
  if (typeof window === "undefined") {
    return [] as StoredPost[];
  }

  const rawPosts = window.localStorage.getItem(POSTS_STORAGE_KEY);

  if (!rawPosts) {
    return [] as StoredPost[];
  }

  try {
    return JSON.parse(rawPosts) as StoredPost[];
  } catch {
    return [] as StoredPost[];
  }
};

export const savePost = (post: StoredPost) => {
  if (typeof window === "undefined") {
    return;
  }

  const posts = getStoredPosts();
  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify([post, ...posts]));
};
