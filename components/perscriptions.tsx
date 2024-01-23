"use client";
import { searchPerscriptions } from "./search/search-action";
import { Search } from "./search";
import { toast } from "sonner";
import { useState } from "react";
import { Results } from "./results";

export default function Perscriptions() {
  const [{ count, data }, setResults] = useState<
    Awaited<ReturnType<typeof searchPerscriptions>>
  >({ count: 0, data: [] });

  async function clientSearch(formdata: FormData) {
    try {
      setResults(await searchPerscriptions(formdata));
    } catch (e) {
      if (e instanceof Error) {
        toast(e.message);
      } else toast(`unknown problem ${JSON.stringify(e)}`);
    }
  }

  return (
    <>
      <div className="w-full">
        <Search search={clientSearch} />
        {count > 0 && <span className="text-sm px-1 py-3 text-muted-foreground">{count} results found.</span>}
      </div>
      <Results state={data} />
    </>
  );
}
