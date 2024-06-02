import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const offers = await prisma.offer.findMany({
      where: {
        articleIDs: {
          has: id,
        },
      },
    });

    // Update the offers
    const updatePromises = offers.map((offer) =>
      prisma.offer.update({
        where: {
          id: offer.id,
        },
        data: {
          articleIDs: {
            set: offer.articleIDs.filter((ID) => ID !== id),
          },
        },
      })
    );

    const updatedOffers = await Promise.all(updatePromises);

    const deletedArticle = await prisma.article.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedArticle);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

    const article = await prisma.article.update({
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
          connect: { id: blindsTypeId },
        },
        blindsWidth: blindsWidth,
        blindsHeight: blindsHeight,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(null);
  }
}
