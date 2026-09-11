"use client";

import { Filter } from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Filters = ({ filters }: { filters: Filter[] }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(
    null,
  );

  const selectedFilterName =
    filters.find((filter) => filter.value === selectedFilter)?.name || "All";

  return (
    <div className="flex w-full items-center gap-2">
      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
        <SelectTrigger className=" p-4 border border-border">
          <SelectValue>Status | {selectedFilterName}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {filters.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
