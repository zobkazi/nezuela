import Blog from './blog.model';

export const fetchAllBlogs = async () => {
  return await Blog.find({});
};

export const addNewBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};
