import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.type.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    return new NextResponse("Type already exists", { status: 500 });
  }

  const type = await prisma.type.create({
    data: {
      name,
    },
  });

  return NextResponse.json(type);
}

export async function GET() {
  try {
    const types = await prisma.type.findMany();
    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
