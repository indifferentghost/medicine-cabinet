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
import { addPerscription, removePerscription } from "./results-actions";
import { Separator } from "./ui/separator";
import { TextMuted } from "./ui/typography";

export function PerscriptionCard({
  hasPerscription,
  ...drug
}: Drug & { hasPerscription: boolean }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>{drug.brand_name}</CardTitle>
        <CardDescription>{drug.generic_name}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="pb-2">
          <TextMuted>Strength</TextMuted>
          <p className="pl-2">{drug.strength}</p>
        </div>
        {drug.route && (
          <div className="pb-2">
            <TextMuted>Route</TextMuted>
            <p className="pl-2">{drug.route}</p>
          </div>
        )}
        <div>
          <TextMuted>Company</TextMuted>
          <p className="pl-2">{drug.labeler_name}</p>
        </div>
      </CardContent>
      <CardFooter className="">
        <p>{drug.product_ndc}</p>
        <section className="ml-auto">
          {hasPerscription ? (
            <Button
              onClick={() => removePerscription(structuredClone(drug))}
              className="bg-card hover:bg-destructive/80"
              variant="destructive"
              size="icon"
            >
              <XCircle className="h-4 w-4 text-destructive-foreground" />
              <span className="sr-only">remove perscription</span>
            </Button>
          ) : (
            <Button
              onClick={() => addPerscription(structuredClone(drug))}
              className="bg-primary hover:bg-primary/80 rounded-full"
              variant="outline"
              size="icon"
            >
              <PlusCircle className="h-4 w-4 text-primary-foreground" />
              <span className="sr-only">add perscription</span>
            </Button>
          )}
        </section>
      </CardFooter>
    </Card>
  );
}
