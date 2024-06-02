import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.blindsType.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    return new NextResponse("Blinds type already exists", { status: 500 });
  }

  const blindsType = await prisma.blindsType.create({
    data: {
      name,
    },
  });

  return NextResponse.json(blindsType);
}

export async function GET() {
  try {
    const blindsTypes = await prisma.blindsType.findMany();
    return NextResponse.json(blindsTypes);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
