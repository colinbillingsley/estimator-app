"use client";
import React from "react";
import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { ColumnDef, convertToCurrency, DataTable } from "../DataTable";
import { Quote } from "@/types";
import {
  DotsThreeIcon,
  PencilLineIcon,
  CopyIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const quoteStatusFilters = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Awarded",
    value: "awarded",
  },
  {
    name: "Awaiting Response",
    value: "awaiting_response",
  },
  {
    name: "Draft",
    value: "draft",
  },
  {
    name: "Lost",
    value: "lost",
  },
];

const columns: ColumnDef<Quote>[] = [
  {
    header: "Job Title",
    cell: (quote) => quote.name,
  },
  {
    header: "Client",
    cell: (quote) => quote.generalContractor,
  },
  {
    header: "Amount",
    cell: (quote) => `$${convertToCurrency(quote.amount)}`,
  },
  {
    header: "Date Created",
    cell: (quote) => quote.dateCreated.toLocaleDateString(),
  },
  {
    header: "Status",
    cell: (quote) => (
      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
        {quote.status}
      </span>
    ),
  },
  {
    header: "Actions",
    cell: (quote) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            className={`p-2 hover:bg-accent/25 transition-all duration-200`}
          >
            <DotsThreeIcon size={16} />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <PencilLineIcon size={16} className="mr-1" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon size={16} className="mr-1" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <TrashIcon size={16} className="mr-1" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const QuotesClient = ({ data }: { data: any[] }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState<string>("");

  return (
    <div className={`flex flex-col gap-4 w-full h-full`}>
      <div className={`flex items-center gap-2 w-full h-full`}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          className={``}
        />
        <Filters filters={quoteStatusFilters} />
      </div>
      <DataTable
        data={data}
        columns={columns}
        emptyMessage="No quotes found."
      />
    </div>
  );
};

export default QuotesClient;
