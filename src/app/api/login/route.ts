/* ---------------------------------
Login route
--------------------------------- */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO send to BE

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/home`);
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 400 }
    );
  }
}
