"use server";

import { db } from "@/lib/memory";
import { drugToSchema } from "@/scripts/load-db";
import { search } from "@orama/orama";
import {
  Output,
  flatten,
  minLength,
  object,
  safeParse,
  string,
  toTrimmed,
} from "valibot";

const searchValidation = object({
  search: string("must be a string", [
    toTrimmed(),
    minLength(3, "must have at least 3 characters"),
  ]),
});

export async function searchPerscriptions(formData: FormData) {
  const result = safeParse(searchValidation, {
    search: formData.get("search"),
  });

  if (!result.success) {
    throw new Error(JSON.stringify(flatten(result.issues).nested));
  }

  const {
    output: { search: searchString },
  } = result;

  const results = await search<typeof db, Output<typeof drugToSchema>>(db, {
    term: searchString,
  });

  return {
    count: results.count,
    data: results.hits.map((v) => v.document),
  };
}
