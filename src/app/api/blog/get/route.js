export const dynamic = 'force-static'
 
export async function GET() {
  const res = await fetch('https://bdtime24-net-api-6lh5.onrender.com/api/news', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}