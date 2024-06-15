import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(null);
  }
}
