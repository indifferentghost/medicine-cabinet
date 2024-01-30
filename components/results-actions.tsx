"use server";

import { auth } from "@/lib/auth";
import { users } from "@/lib/db";
import { Drug } from "@/scripts/load-db";



export async function addPerscription(drug: Drug) {
  const session = await auth();
  await users?.findOneAndUpdate(
    { id: session?.user?.id },
    { $push: { perscriptions: drug.product_ndc } }
  );
}

export async function removePerscription(drug: Drug) {
  const session = await auth();
  await users?.findOneAndUpdate(
    { id: session?.user?.id },
    { $pull: { perscriptions: drug.product_ndc } }
  );
}

export async function getPerscriptions() {
  const session = await auth();
  const user = await users?.findOne({ id: session?.user?.id });
  return user?.perscriptions;
}
