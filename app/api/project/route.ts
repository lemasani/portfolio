import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // You can perform any async operations here, such as fetching data from a database

  // Return a JSON response
  return NextResponse.json({ message: "GET request to /api/project" });

  // Alternatively, using the native Respone object:
  /*
  return new Response(JSON.stringify({ message: "GET request to /api/project" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  */
}

interface postData {
  name: string
}

export async function POST(req: Request){
  const project: postData = await req.json()

  return NextResponse.json({
    message: "body received succesfully",
    status: 201,
    data: project
  })
}