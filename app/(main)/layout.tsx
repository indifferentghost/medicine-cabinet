import { PrimaryNavigation } from "@/components/primary-navigation";
import { TextH1 } from "@/components/ui/typography";
import { SessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (

    <div className="px-24 pt-24">
      <header className="p-2 rounded-lg mb-5 bg-primary">
        <TextH1 className="text-primary-foreground pb-2">Medicine Cabinet</TextH1>
        <SessionProvider>
          <PrimaryNavigation />
        </SessionProvider>
      </header>
      <main className="flex flex-col items-center justify-between">{children}</main>
    </div>
  );
};

export default Layout;