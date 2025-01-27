export default async function Page() {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiEndpoint}/api/news`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  const responseData = await res.json();

  // Access the articles array
  const articles = responseData.articles || [];

  // Check if articles exist
  if (articles.length === 0) {
    return <p>No articles available at the moment.</p>;
  }

  return (
    <ul>
      {articles.map((article) => (
        <>
        <li key={article.id}>{article.title}</li>
       <li>
          {article.description}
       </li>
        </>

      ))}
    </ul>
  );
}
