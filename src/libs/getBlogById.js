// /lib/blogData.ts
export async function getAllBlogIds() {
    const blogData = [
      { id: '1', title: 'First Blog Post' },
      { id: '2', title: 'Second Blog Post' },
    ];
    return blogData.map((post) => post.id);
  }
  