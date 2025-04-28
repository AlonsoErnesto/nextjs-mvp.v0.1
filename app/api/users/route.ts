import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { userSchema } from "@/schemas/zod-schemas";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body with Zod
    const validationResult = userSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid user data",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const userData = validationResult.data;

    // Insert the user into the database
    const newUser = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        password: "hashed-password", // In a real app, you would hash the password
      })
      .returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
