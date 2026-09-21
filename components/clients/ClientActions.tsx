"use client";

import {
  DotsThreeIcon,
  CopyIcon,
  PencilSimpleLineIcon,
  ArchiveIcon,
} from "@phosphor-icons/react";

import { Client } from "@/types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ClientActionsProps = {
  client: Client;
};

export function ClientActions({ client }: ClientActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(event) => event.stopPropagation()}
        className={`hover:bg-primary/30 rounded-md p-1 transition-all duration-200`}
      >
        <DotsThreeIcon size={20} weight="bold" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        onClick={(event) => event.stopPropagation()}
      >
        <DropdownMenuItem>
          <PencilSimpleLineIcon />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <ArchiveIcon />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
