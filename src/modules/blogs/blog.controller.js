import { fetchAllBlogs, addNewBlog } from './blog.services';

export const getBlogs = async () => {
  return await fetchAllBlogs();
};

export const createBlog = async (blogData) => {
  return await addNewBlog(blogData);
};
