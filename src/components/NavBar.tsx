import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export function NavMenu() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <a href="/" className="text-lg font-bold">
          Jump Squat Telemetry
        </a>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            {/* Menu Item 1 */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="/"
                  className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Record Data
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Menu Item 2 */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>View Performance Data</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[200px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/viewSingleData"
                        className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        View Single Athlete Data
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        href="/compareAthletes"
                        className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        Compare Athletes
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Simple link (no dropdown) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="/athletes"
                  className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                >
                  Manage Athletes
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
