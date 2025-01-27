import React from 'react'

const page = async ({
  params: {
    _id
  }

  
}) => {

  const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiEndpoint}/api/news${_id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',

  });

  const responseData = await res.json();

  console.log(responseData.articles)
  return (
    <div>
      <h1>Page: { _id }</h1>

     <p>Page content</p>

     <h1>
      
     </h1>
    </div>
  )
}

export default page