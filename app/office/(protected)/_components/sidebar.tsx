"use client";

import Link from "next/link";
import { Key, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MenuEntities } from "./data/nav-links";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

interface NavProps {
  isCollapsed: boolean;
  entities: MenuEntities[];
}

export function Nav({ entities, isCollapsed }: NavProps) {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {entities.map((entity, index) => (
          <div key={index}>
            {isCollapsed ? (
              entity.routes.map(({ title, href, Icon }, index) => {
                const variant: "default" | "ghost" =
                  pathname == href ? "default" : "ghost";
                return (
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={href as Url}
                        className={cn(
                          buttonVariants({ variant: variant, size: "icon" }),
                          "h-9 w-9",
                          variant === "default" &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="">
                      {title}
                    </TooltipContent>
                  </Tooltip>
                );
              })
            ) : (
              <>
                <p className="">{entity.name}</p>
                <div className="mt-2 mb-4">
                  {entity.routes.map(({ title, href, Icon }, index) => {
                    const variant: "default" | "ghost" =
                      pathname == href ? "default" : "ghost";
                    return (
                      <Link
                        key={index}
                        href={href as Url}
                        className={cn(
                          buttonVariants({ variant: variant, size: "sm" }),
                          variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                          "justify-start",
                          "w-full ml-4"
                        )}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {title}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
