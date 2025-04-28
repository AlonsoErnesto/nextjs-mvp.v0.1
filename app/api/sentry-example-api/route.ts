import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

export function GET() {
  try {
    throw new SentryExampleAPIError(
      "This error is raised on the backend called by the example page."
    );
    return NextResponse.json({ data: "Testing Sentry Error..." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
