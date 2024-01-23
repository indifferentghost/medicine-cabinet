"use server";

import { mdb } from "@/lib/db";
import { Drug } from "@/scripts/load-db";
import { ObjectId } from "mongodb";
import { AdapterUser } from "next-auth";

const users = mdb?.collection<AdapterUser>('users');

export async function addPerscription(drug: Drug) {
  // TODO:TD-23-1-24 validate session
  await users?.findOneAndUpdate(
      { id: "1" },
      { $push: { perscriptions: drug.product_ndc } }
    );
}

export async function removePerscription(drug: Drug) {
  // TODO:TD-23-1-24 validate session
  await users?.findOneAndUpdate(
      { _id: new ObjectId(1) },
      { $pull: { perscriptions: drug.product_ndc } }
    );
}

export async function getPerscriptions() {
  // TODO:TD-23-1-24 validate session
  const user = await users?.findOne({ _id: new ObjectId(1) });
  return user?.perscriptions
}