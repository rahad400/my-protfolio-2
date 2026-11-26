import { NextResponse } from "next/server";

const RECIPIENT = "rahad56709@gmail.com";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !subject ||
    message.length < 10
  ) {
    return NextResponse.json(
      { message: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: subject,
        message,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data: { success?: boolean; message?: string } | null =
      await response.json().catch(() => null);

    if (!response.ok || data?.success === false) {
      return NextResponse.json(
        { message: data?.message || "Your message could not be sent." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Your message could not be sent. Please try again." },
      { status: 502 },
    );
  }
}
