import '../../tailwind.css';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  NavigationMenu,
} from '@/components/ui/navigation-menu';

const NavBar = (props) => {
  const { title, navItems } = props;

  return (
    <NavigationMenu className="ml-5">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
            'group',
          )}
        >
          {title}
          <ChevronDown
            className="relative top-[1px] ml-auto h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {navItems && navItems.length > 0 ? (
            navItems.map((item, index) => (
              <DropdownMenuItem key={index}>
                <Link to={`/${title}/${item}`}>
                  {item}
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No items available</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </NavigationMenu>
  );
};

export default NavBar;
