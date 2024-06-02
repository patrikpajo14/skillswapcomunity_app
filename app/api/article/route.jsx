import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const {
    typeId,
    panelId,
    colorId,
    opening,
    substock,
    amount,
    width,
    height,
    blindsTypeId,
    blindsWidth,
    blindsHeight,
    price,
  } = body;

  const type = await prisma.type.findUnique({
    where: {
      id: typeId,
    },
  });

  const name = type.name;

  if (
    !type ||
    !panelId ||
    !opening ||
    !substock ||
    !width ||
    !height ||
    !price
  ) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const article = await prisma.article.create({
    data: {
      name: name,
      amount: amount,
      width: width,
      height: height,
      opening: opening,
      substock: substock,
      price: price,
      type: {
        connect: { id: typeId },
      },
      panel: {
        connect: { id: panelId },
      },
      color: {
        connect: { id: colorId },
      },
      blinds: {
        connect: {
          id: blindsTypeId === "" ? "66118995581fefc121ecebbb" : blindsTypeId,
        },
      },
      blindsWidth: blindsWidth,
      blindsHeight: blindsHeight,
    },
  });

  return NextResponse.json(article);
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        type: true,
        panel: true,
        color: true,
        blinds: true,
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
