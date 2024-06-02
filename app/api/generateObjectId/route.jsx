import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const objectId = new ObjectId();
    const randomId = Math.random().toString(36).substring(2, 4);
    const exportId = `${objectId.toString().slice(0, 22)}${randomId}`;

    return NextResponse.json({ objectId: exportId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
