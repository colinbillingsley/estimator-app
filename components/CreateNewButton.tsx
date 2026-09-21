import { cn } from "@/lib/utils";
import {
  AddressBookIcon,
  PenNibIcon,
  PlusIcon,
  TriangleIcon,
} from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

const CreateNewButton = ({
  createOpen,
  setCreateOpen,
}: {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  useEffect(() => {
    if (createOpen) {
      const documentClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          !target.closest(".create-new-button") &&
          !target.closest(".tooltip-content")
        ) {
          setCreateOpen(false);
          document.removeEventListener("click", documentClickHandler);
        }
      };

      document.addEventListener("click", documentClickHandler);
    }
  }, [createOpen]);

  return (
    <div className="w-fit relative">
      <Tooltip open={!createOpen && tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger
          onClick={() => {
            setCreateOpen(!createOpen);
            setTooltipOpen(false); // 👈 force close
          }}
          className="px-4 py-2 bg-primary flex items-center gap-2 rounded-md hover:bg-primary/80 hover:cursor-pointer active:translate-y-[2px] transition-all duration-200"
        >
          <PlusIcon className="size-4" />
          <span className="block whitespace-nowrap text-sm text-primary-foreground">
            Create New
          </span>
        </TooltipTrigger>

        <TooltipContent side="bottom" sideOffset={10}>
          <p>Create new...</p>
        </TooltipContent>
      </Tooltip>

      {/* 👇 OUTSIDE tooltip */}
      <div
        className={cn(
          "absolute flex flex-col bg-white border border-border top-10 left-0 sm:left-auto sm:right-0 z-10 w-[200px] hover:cursor-pointer transition-all duration-200",
          createOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none",
        )}
      >
        <Link
          onClick={() => setCreateOpen(false)}
          href="/quotes/new"
          className="flex items-center gap-2 p-3 hover:bg-muted transition-all duration-200"
        >
          <PenNibIcon size={20} weight="light" />
          <span className="text-sm">New Quote</span>
        </Link>
        <Link
          onClick={() => setCreateOpen(false)}
          href=""
          className="flex items-center gap-2 p-3 hover:bg-muted transition-all duration-200"
        >
          <AddressBookIcon size={20} weight="light" />
          <span className="text-sm">New Client</span>
        </Link>
      </div>
    </div>
  );
};

export default CreateNewButton;
