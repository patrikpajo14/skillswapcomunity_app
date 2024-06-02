import getCurrentUser from "@/app/actions/GetCurrentUser";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { articles, data, articleList } = body;

  const { customerName, address, phone, email, city } = data;

  const currentUser = await getCurrentUser();

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

  if (!customerName || !address || !phone || !email || !city) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const offer = await prisma.offer.create({
    data: {
      customer_name: customerName,
      customer_address: address,
      customer_phone_number: phone,
      customer_email: email,
      status: "pending",
      place: {
        connect: {
          id: existPlace ? existPlace.id : place.id,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
      articles: {
        connect: articles.map((article) => ({
          id: article.id,
        })),
      },
      articleList: articleList,
    },
    include: {
      place: true,
      articles: true,
    },
  });

  return NextResponse.json(offer);
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    const offers = await prisma.offer.findMany({
      where: {
        user_id: currentUser.id,
      },
      include: {
        place: true,
      },
      orderBy: {
        create_date: "desc",
      },
    });

    const body = await Promise.all(
      offers.map(async (offer) => {
        const total = offer.articleList.reduce(
          (sum, article) => sum + article.price * article.amount,
          0
        );

        return {
          ...offer,
          total: total,
        };
      })
    );

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
