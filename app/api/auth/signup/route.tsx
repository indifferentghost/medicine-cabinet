import { createUser, credentialsSchema } from "@/lib/auth";
import { NextResponse } from "next/server";
import { flatten, safeParse } from "valibot";

export async function POST(request: Request) {
  const parsedJson = safeParse(credentialsSchema, await request.json());
  if (!parsedJson.success) {
    // TODO:TD-27-01-24 let's log stuff somehwere better
    console.error(flatten(parsedJson.issues));
    throw new Error("Credentials Invalid");
  }
  await createUser(parsedJson.output)

  return NextResponse.json({ message: "success" });
}
