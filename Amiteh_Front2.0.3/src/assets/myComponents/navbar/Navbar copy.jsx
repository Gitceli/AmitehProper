
import '../../tailwind.css'
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, ChevronRight, Circle } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const NavBar = (props) => {
  const title = props.title
  const navitem1 = props.navitem1
  const navitem2 = props.navitem2
  const navitem3 = props.navitem3
  const navitem4 = props.navitem4
  const navitem5 = props.navitem5


  return (
    <>
      <NavigationMenu className="ml-5">

        <DropdownMenu >
          <DropdownMenuTrigger
            className={cn(
              "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
              "group", // Add group class for animation
            )}
          >
            {title}
      
            <ChevronDown
              className="relative top-[1px] ml-auto h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />

          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <a href={`http://127.0.0.1:8000/product/${props.name}/`} className="block"><DropdownMenuItem>{navitem1}</DropdownMenuItem></a>
            <DropdownMenuItem>{navitem2}</DropdownMenuItem>
            <DropdownMenuItem>{navitem3}</DropdownMenuItem>
            <DropdownMenuItem>{navitem4}</DropdownMenuItem>
            <DropdownMenuItem>{navitem5}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </NavigationMenu>
    </>
  )
}

export default NavBar




