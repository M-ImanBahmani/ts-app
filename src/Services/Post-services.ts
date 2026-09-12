import { DUMMY_BASE_URL } from "../Contstans";
import type { CreatePostForm } from "../Types/CreatePostForm";
import type { Post, PostsResponse } from "../Types/Posts";


// create Post for API
export const createPostsApi = async (post : CreatePostForm) => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    const err = await res.json();
    throw new Error( err.message ||
      `Failed to create post. Server responded with status: ${res.status}`,
    );
  }
};

// get Posts for API

export const getPostsApi = async (): Promise<PostsResponse> => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data.message);
  }
};

// get Post for API
export const getPostApi = async (id: number): Promise<Post> => {
  const res = await fetch(`${DUMMY_BASE_URL}/posts/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return Promise.reject(data.message);
  }
};



