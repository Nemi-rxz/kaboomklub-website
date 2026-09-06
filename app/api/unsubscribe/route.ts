import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SubscriberModel } from "@/lib/models/Subscriber";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Unsubscribe token is required" }, { status: 400 });
  await connectDB();
  const subscriber = await SubscriberModel.findOneAndUpdate({ unsubscribeToken: token }, { status: "UNSUBSCRIBED" }, { new: true });
  if (!subscriber) return NextResponse.json({ error: "Invalid unsubscribe token" }, { status: 404 });
  return NextResponse.json({ success: true, message: "You have been unsubscribed." });
}