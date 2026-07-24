"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  CalculatorIcon,
  FilesIcon,
  FoldersIcon,
  InvoiceIcon,
  PaperPlaneTiltIcon,
  SquaresFourIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UsersThreeIcon,
  AddressBookIcon,
} from "@phosphor-icons/react";
import SideBarLink from "./SideBarLink";
import { useState } from "react";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <SquaresFourIcon size={20} weight="light" />,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: <AddressBookIcon size={20} weight="light" />,
  },
  {
    title: "Estimates",
    href: "/estimates",
    icon: <FilesIcon size={20} weight="light" />,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FoldersIcon size={20} weight="light" />,
  },
  {
    title: "Quotes",
    href: "/quotes",
    icon: <InvoiceIcon size={20} weight="light" />,
  },
  {
    title: "Submissions",
    href: "/submissions",
    icon: <PaperPlaneTiltIcon size={20} weight="light" />,
  },
  {
    title: "Team",
    href: "/team",
    icon: <UsersThreeIcon size={20} weight="light" />,
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={cn(
        `relative w-18 md:w-36 ${sidebarOpen ? "md:w-36" : "md:w-18"} bg-secondary px-2 py-4 flex flex-col items-center justify-between gap-6 transition-all duration-200`,
      )}
    >
      <div className="flex items-center justify-center gap-2 w-full overflow-hidden">
        <div className="bg-primary p-2 shrink-0">
          <CalculatorIcon size={20} weight="fill" />
        </div>

        <span
          className={`hidden ${sidebarOpen ? "md:block" : "md:hidden"} font-heading font-medium uppercase text-sm`}
        >
          Estimator App
        </span>
      </div>

      <ul className="h-full flex flex-col justify-start gap-1 overflow-hidden">
        {sidebarLinks.map((link) => (
          <li key={link.title} className="w-full">
            <SideBarLink
              title={link.title}
              href={link.href}
              icon={link.icon}
              sidebarOpen={sidebarOpen}
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        <UserButton />
      </div>

      <button
        className="hidden md:flex absolute -right-10 bottom-5 bg-primary p-1 hover:cursor-pointer overflow-hidden w-8 h-8 items-center justify-center"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Left Arrow */}
          <ArrowLeftIcon
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300",
              sidebarOpen
                ? "-translate-x-1/2 -translate-y-1/2"
                : "-translate-x-1/2 -translate-y-[200%]",
            )}
            weight="bold"
          />

          {/* Right Arrow */}
          <ArrowRightIcon
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300",
              sidebarOpen
                ? "-translate-x-1/2 translate-y-[200%]"
                : "-translate-x-1/2 -translate-y-1/2",
            )}
            weight="bold"
          />
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
