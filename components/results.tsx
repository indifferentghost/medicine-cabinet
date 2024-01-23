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
import { PlusCircle } from "lucide-react";

export function Results({ state }: { state: Drug[] }) {
  return (
    <section
      role="list"
      className="grid items-start grid-flow-dense grid-cols-1 gap-6 grow sm:grid-cols-2 lg:grid-cols-3 p-8"
    >
      {state.map((drug) => (
        <Card key={drug.product_ndc}>
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
              <Button className="bg-card hover:bg-muted-foreground" variant="outline" size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </section>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}