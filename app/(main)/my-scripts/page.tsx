import { getPerscriptions } from "@/components/results-actions";
import { db } from "@/lib/memory";
import { auth } from "@/lib/auth";
import { drugToSchema } from "@/scripts/load-db";
import { search } from "@orama/orama";
import { Output } from "valibot";
import { PerscriptionCard } from "@/components/perscription-card";
import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function MyScripts() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>You&apos;re not logged in!</AlertTitle>
          <AlertDescription>
            You&apos;d be able to see a lot more if you did!
          </AlertDescription>
        </Alert>
      </>
    );
  }

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

  return (
    <section role="list">
      {scripts.map((v) => (
        <PerscriptionCard key={v.product_ndc} {...v} />
      ))}
    </section>
  );
}
