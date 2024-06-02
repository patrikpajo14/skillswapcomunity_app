import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const offer = await prisma.offer.findUnique({
      where: {
        id: id,
      },
      include: {
        place: true,
      },
    });

    const total = offer.articleList.reduce(
      (sum, article) => sum + article.price * article.amount,
      0
    );
    const body = {
      ...offer,
      total: total,
    };
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const articles = await prisma.article.findMany({
      where: {
        offersIDs: {
          has: id,
        },
      },
    });

    // Update the articles
    const updatePromises = articles.map((article) =>
      prisma.article.update({
        where: {
          id: article.id,
        },
        data: {
          offersIDs: {
            set: article.offersIDs.filter((ID) => ID !== id),
          },
        },
      })
    );

    const updatedArticles = await Promise.all(updatePromises);

    const deletedOffer = await prisma.offer.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedOffer);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const { articles, data, articleList } = body;

    const { customerName, address, phone, email, city } = data;

    const existPlace = await prisma.places.findUnique({
      where: {
        place_name: city,
      },
    });

    const place =
      !existPlace &&
      (await prisma.places.create({
        data: {
          place_name: city,
        },
      }));

    const updatedOffer = await prisma.offer.update({
      data: {
        customer_name: customerName,
        customer_address: address,
        customer_phone_number: phone,
        customer_email: email,
        place: {
          connect: {
            id: existPlace ? existPlace.id : place.id,
          },
        },
        articleList: articleList,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json(updatedOffer);
  } catch (error) {
    return NextResponse.json(null);
  }
}
