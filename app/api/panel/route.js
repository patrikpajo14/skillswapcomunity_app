import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.panel.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    return new NextResponse("Panel already exists", { status: 500 });
  }

  const panel = await prisma.panel.create({
    data: {
      name,
    },
  });

  return NextResponse.json(panel);
}

export async function GET() {
  try {
    const panels = await prisma.panel.findMany();
    return NextResponse.json(panels);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
