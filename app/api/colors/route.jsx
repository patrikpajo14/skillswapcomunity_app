import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.color.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    return new NextResponse("Color already exists", { status: 500 });
  }

  const color = await prisma.color.create({
    data: {
      name,
    },
  });

  return NextResponse.json(color);
}

export async function GET() {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
