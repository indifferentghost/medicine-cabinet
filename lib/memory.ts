import { count, create } from "@orama/orama";

if (typeof window !== 'undefined') {
  throw new Error('db should only be used on server')
}

export const db = await create({
  schema: {
    product_ndc: "string",
    generic_name: "string",
    labeler_name: "string",
    brand_name: "string",
    strength: "string",
    route: "string",
  } as const,
  plugins: [
    {
      // TODO:TD-22-01-24 check if instrementation can be used for this
      // https://discord.com/channels/752553802359505017/1199200872392032296
      name: "insert-db-on-search-if-empty",
      beforeSearch: async (orama) => {
        if (!(await count(orama))) {
          await import("@/scripts/load-db");
        }
      },
    },
  ],
});
