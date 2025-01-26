export default async function Page() {
  const res = await fetch('https://bdtime24-net-api-6lh5.onrender.com/api/news');
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
