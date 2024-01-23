import { db } from "@/lib/memory";
import drugs from "../drugs.json"; //  with { type: 'json' };
import { insertMultiple } from "@orama/orama";
import {
  safeParse,
  array,
  object,
  string,
  transform,
  flatten,
  Output,
  optional,
  toLowerCase,
} from "valibot";

const ingredientDefault = [{ strength: "unlisted" }];

// TODO:TD-22-01-24 a valibot to orama schema converter would be nice
const drugSchema = object({
  product_ndc: string(),
  generic_name: string(),
  labeler_name: string(),
  brand_name: string(),
  active_ingredients: optional(
    array(object({ strength: string() })),
    ingredientDefault
  ),
  route: optional(array(string([toLowerCase()]))),
});

export const drugToSchema = transform(drugSchema, (drug) => {
  const { active_ingredients, route, ...drugValues } = drug;
  return {
    ...drugValues,
    ...(route && { route: route[0] }),
    strength: active_ingredients[0].strength,
  };
});

export type Drug = Output<typeof drugToSchema>;

const drugArraySchema = array(drugToSchema);

const parsedDrugs = safeParse(drugArraySchema, drugs);

if (parsedDrugs.success) {
  const { output } = parsedDrugs;
  console.log(output.length, 'values inserted')
  await insertMultiple(db, output);
} else {
  console.error(flatten(parsedDrugs.issues));
}
