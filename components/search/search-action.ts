"use server";

import { db } from "@/lib/db";
import { drugToSchema } from "@/scripts/load-db";
import { search } from "@orama/orama";
import {
  Output,
  ValiError,
  flatten,
  minLength,
  object,
  parse,
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

export async function searchPerscriptions(
  formData: FormData,
  limit = 10,
  offset = 0
) {
  const result = safeParse(searchValidation, {
    search: formData.get("search"),
  });

  if (!result.success) {
    throw new Error(`${flatten(result.issues).nested}`);
  }

  const {
    output: { search: searchString },
  } = result;
  const results = await search<typeof db, Output<typeof drugToSchema>>(db, {
    term: searchString,
    limit,
    offset,
  });

  try {
    return {
      count: results.count,
      data: results.hits.map((v) => v.document),
    };
  } catch (e) {
    if (e instanceof ValiError) {
      console.log(flatten<typeof drugToSchema>(e.issues));
    }
    throw e;
  }
}
