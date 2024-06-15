import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const body = await request.json();

    const { id, activated } = body;

    const results = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        activated: activated,
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(null);
  }
}
