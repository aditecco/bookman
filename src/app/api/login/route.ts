/* ---------------------------------
Login route
--------------------------------- */

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data } =
      (await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local`, {
        identifier: email,
        password,
      })) ?? {};

    console.log(data);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
    // TODO redirect won't work
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/home`);
  } catch (error) {
    return NextResponse.json(
      // BE writes the error to: error.response.data.error.message
      {
        message: "Error processing request",
        error: error.response.data.error.message,
      },
      { status: 400 }
    );
  }
}
