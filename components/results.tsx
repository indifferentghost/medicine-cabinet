import { Drug } from "@/scripts/load-db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import {
  addPerscription,
  getPerscriptions,
  removePerscription,
} from "./results-actions";
import { useEffect, useState } from "react";

function PerscriptionCard({
  hasPerscription,
  ...drug
}: Drug & { hasPerscription: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{drug.brand_name}</CardTitle>
        <CardDescription>{drug.generic_name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>strength: {drug.strength}</p>
        {drug.route && <p>route: {drug.route}</p>}
        <p>company: {drug.labeler_name}</p>
      </CardContent>
      <CardFooter>
        <p>{drug.product_ndc}</p>
        <section className="ml-auto">
          {hasPerscription ? (
            <Button
              onClick={() => removePerscription(structuredClone(drug))}
              className="bg-card hover:bg-destructive-foreground"
              variant="destructive"
              size="icon"
            >
              <XCircle className="h-4 w-4" />
              <span className="sr-only">remove perscription</span>
            </Button>
          ) : (
            <Button
              onClick={() => addPerscription(structuredClone(drug))}
              className="bg-card hover:bg-muted-foreground"
              variant="outline"
              size="icon"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">add perscription</span>
            </Button>
          )}
        </section>
      </CardFooter>
    </Card>
  );
}

export function Results({ state }: { state: Drug[] }) {
  const [perscriptions, setPerscriptions] = useState<string[]>([]);

  useEffect(() => {
    const initPerscriptions = async () => {
      const updatedPerscriptions = await getPerscriptions();
      setPerscriptions(updatedPerscriptions ?? []);
    };
    initPerscriptions();
  }, []);
  return (
    <section
      role="list"
      className="grid items-start grid-flow-dense grid-cols-1 gap-6 grow sm:grid-cols-2 lg:grid-cols-3 p-8"
    >
      {state.map((drug) => (
        <PerscriptionCard
          key={drug.product_ndc}
          {...drug}
          hasPerscription={perscriptions.includes(drug.product_ndc)}
        />
      ))}
    </section>
  );
}
