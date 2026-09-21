"use client";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

export type ColumnDef<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string;

  selectable?: boolean;

  selectedIds: Set<string>;
  onSelectedIdsChange?: (ids: Set<string>) => void;

  getRowHref?: (row: T) => string;
  emptyMessage?: string;
};

export const convertToCurrency = (amount: number): string => {
  return `$ ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "No results.",
  getRowHref,
  selectable = false,
  getRowId,
  selectedIds,
  onSelectedIdsChange,
}: DataTableProps<T>) {
  const router = useRouter();

  const allSelected = data.length > 0 && selectedIds.size === data.length;

  const handleSelectAll = (checked: boolean) => {
    const nextIds = checked
      ? new Set(data.map((row) => getRowId(row)))
      : new Set<string>();

    onSelectedIdsChange(nextIds);
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    const id = getRowId(row);
    const nextIds = new Set(selectedIds);

    if (checked) {
      nextIds.add(id);
    } else {
      nextIds.delete(id);
    }

    onSelectedIdsChange(nextIds);
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="flex items-center justify-center self-center">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true)
                  }
                  aria-label="Select all rows"
                />
              </TableHead>
            )}

            {columns.map((column, index) => (
              <TableHead
                key={index}
                className="bg-muted text-sm font-medium text-muted-foreground"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => {
              const rowId = getRowId(row);

              return (
                <TableRow
                  key={rowId}
                  onClick={() => {
                    if (getRowHref) {
                      router.push(getRowHref(row));
                    }
                  }}
                  className={cn(
                    "h-14",
                    getRowHref ? "cursor-pointer" : undefined,
                  )}
                >
                  {selectable && (
                    <TableCell
                      className="flex items-center justify-center"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        checked={selectedIds.has(rowId)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(row, checked === true)
                        }
                        aria-label={`Select row ${rowId}`}
                      />
                    </TableCell>
                  )}

                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex} className="text-sm">
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow className="h-14">
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
