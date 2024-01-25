import { PrimaryNavigation } from "@/components/primary-navigation";
import Perscriptions from "@/components/perscriptions";
import { TextH1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="px-24 pt-24">
      <header className="p-2 rounded-lg mb-5 bg-primary">
        <TextH1 className="text-primary-foreground pb-2">Medicine Cabinet</TextH1>
        <PrimaryNavigation />
      </header>
      <main className="flex flex-col items-center justify-between">
        <Perscriptions />
      </main>
    </div>
  );
}
