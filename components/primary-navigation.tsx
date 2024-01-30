"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export function PrimaryNavigation() {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <NavigationMenu className="w-full max-w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === "/"}
              className={cn(navigationMenuTriggerStyle(), "bg-primary")}
            >
              Search Perscriptions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/my-scripts" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === "/my-scripts"}
              className={cn(navigationMenuTriggerStyle(), "bg-primary")}
            >
              My perscriptions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="ml-auto">
        {status === "authenticated" ? (
          <Button variant="destructive" onClick={() => signOut()}>
            Sign out
          </Button>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
        <Button variant="secondary"></Button>
      </div>
    </NavigationMenu>
  );
}
