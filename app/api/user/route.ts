import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await req.json();
  if (!user) return new NextResponse("invalid request", { status: 400 });
  user.password = hashPassword(user.password);
  try {
    const createdUser = await db.user.create({ data: user });
    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
