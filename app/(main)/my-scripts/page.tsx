import { getPerscriptions } from "@/components/results-actions";
import { db } from "@/lib/memory";
import { auth } from "@/lib/auth";
import { drugToSchema } from "@/scripts/load-db";
import { search } from "@orama/orama";
import { redirect } from "next/navigation";
import { Output } from "valibot";

export default async function MyScripts() {
  const session = await auth();
  if (!session) redirect("/");
  console.log(session)

  const perscriptions = await getPerscriptions();
  if (!perscriptions) {
    console.log("no perscriptions available");
    return [];
  }
  const results = perscriptions?.map((perscription) =>
    search<typeof db, Output<typeof drugToSchema>>(db, {
      term: perscription,
      limit: 1,
    })
  );

  const r = await Promise.all(results);
  const scripts = r.flatMap((v) => v.hits.map((h) => h.document));

  if (!scripts.length) return <>no perscriptions to display</>;

  return <>{scripts}</>;
}
