import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { cn } from "@/lib/utils";

const SideBarLink = ({
  title,
  href,
  icon,
  sidebarOpen,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
  sidebarOpen: boolean;
}) => {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      className={`group w-full flex items-center gap-2 p-2 transition-all duration-200 hover:bg-primary/20 ${isActive ? "bg-primary/50" : ""}`}
    >
      <Tooltip>
        <TooltipTrigger
          className={cn(
            `block md:hidden hover:cursor-pointer`,
            sidebarOpen ? "md:hidden" : "md:block",
          )}
          delay={0}
        >
          <div className="group-hover:scale-[1.07] transition-transform duration-200">
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={15}>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          `hidden md:block group-hover:scale-[1.07] transition-transform duration-200`,
          sidebarOpen ? "md:block" : "md:hidden",
        )}
      >
        {icon}
      </div>

      <span
        className={cn(
          `hidden md:block text-sm font-medium`,
          sidebarOpen ? "md:block" : "md:hidden",
        )}
      >
        <span>{title}</span>
      </span>
    </Link>
  );
};

export default SideBarLink;
