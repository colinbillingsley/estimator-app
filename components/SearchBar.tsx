"use client";
import { cn } from "@/lib/utils";
import { XIcon } from "@phosphor-icons/react";
import React from "react";
import { Input } from "./ui/input";

const SearchBar = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("", className)}
      />

      {value.length > 0 && (
        <XIcon
          onClick={() => onChange("")}
          className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500/75 hover:text-neutral-500 hover:scale-[1.075] transition-transform"
          size={20}
        />
      )}
    </div>
  );
};

export default SearchBar;
