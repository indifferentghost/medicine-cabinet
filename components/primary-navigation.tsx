"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink active={pathname === '/'} className={cn(navigationMenuTriggerStyle(), 'bg-primary')}>
              Search Perscriptions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/my-scripts" legacyBehavior passHref>
            <NavigationMenuLink active={pathname === '/my-scripts'} className={cn(navigationMenuTriggerStyle(), 'bg-primary')}>
              My perscriptions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
