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

type FiltersProps = {
  title: string;
  filters: Filter[];
  value: string;
  onChange: (value: string) => void;
};

const Filters = ({ title, filters, value, onChange }: FiltersProps) => {
  const selectedFilterName =
    filters.find((filter) => filter.value === value)?.name ?? "All";

  return (
    <div className="flex items-center gap-2">
      <Select
        value={value}
        onValueChange={(value) => {
          if (value) {
            onChange(value);
          }
        }}
      >
        <SelectTrigger className="border border-border p-4">
          <SelectValue>
            {title} | {selectedFilterName}
          </SelectValue>
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
