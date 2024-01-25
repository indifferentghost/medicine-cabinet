import Perscriptions from "@/components/perscriptions";
import { TextH1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="px-24 pt-24">
      <header className="p-2 rounded-lg mb-5 bg-primary">
        <TextH1 className="text-primary-foreground">Medicine Cabinet</TextH1>
      </header>
      <main className="flex flex-col items-center justify-between">
        <Perscriptions />
      </main>
    </div>
  );
}
