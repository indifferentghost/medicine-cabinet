"use client";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { searchPerscriptions } from "@/components/search/search-action";
import { getPerscriptions } from "@/components/results-actions";
import { Search } from "@/components/search";
import { PerscriptionCard } from "@/components/perscription-card";

const useSearch = () => {
  const [{ count, data }, setResults] = useState<
    Awaited<ReturnType<typeof searchPerscriptions>>
  >({ count: 0, data: [] });

  const clientSearch = useCallback(async (
    formdata: FormData
  ) => {
    try {
      setResults(await searchPerscriptions(formdata));
    } catch (e) {
      if (e instanceof Error) {
        toast(e.message);
      } else toast(`unknown problem ${JSON.stringify(e)}`);
    }
  },
  []);

  return [{ count, data }, clientSearch] as const;
};

const useUserPerscriptions = () => {
  const [perscriptions, setPerscriptions] = useState<string[]>([]);

  useEffect(() => {
    const initPerscriptions = async () => {
      const updatedPerscriptions = await getPerscriptions();
      setPerscriptions(updatedPerscriptions ?? []);
    };
    initPerscriptions();
  }, []);

  return { perscriptions } as const;
}

export default function Home() {
  const [{ count, data }, search] = useSearch();
  const { perscriptions } = useUserPerscriptions();

  return (
    <>
      <div className="w-full pb-8">
        <Search search={search} />
        {count > 0 && (
          <span className="text-sm px-1 py-3 text-muted-foreground">
            {count} results found.
          </span>
        )}
      </div>

      <section
        role="list"
        className="grid items-start auto-rows-fr grid-flow-dense grid-cols-1 gap-6 grow sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((drug) => (
          <PerscriptionCard
            key={drug.product_ndc}
            {...drug}
            hasPerscription={perscriptions.includes(drug.product_ndc)}
          />
        ))}
      </section>
    </>
  );
}
