import React from "react";
import Link from "next/link";
import { NavigationMenuLink } from "./navigation-menu";
import { cn } from "@/lib/utils";

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  children?: React.ReactNode;
  href: string;
}

export const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link href={href} passHref>
            <div
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
