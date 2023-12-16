import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const url = `${process.env.BACKEND_URL}/auth/register`;

  const postBody = await req.json();
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(postBody),
  });

  if (resp.ok) {
    const data = await resp.json();
    return NextResponse.json({ data }, { status: resp.status });
  }

  return NextResponse.json(
    { error: await resp.text() },
    { status: resp.status }
  );
  return NextResponse.json({ error: "Unauthorized" }, { status: res.status });
}
