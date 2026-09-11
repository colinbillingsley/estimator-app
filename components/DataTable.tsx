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
import Link from "next/link";
import { useRouter } from "next/navigation";

export type ColumnDef<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  emptyMessage?: string;
  link?: string;
};

export const convertToCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "No results.",
  link,
}: DataTableProps<T>) {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={`font-heading font-semibold`}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    className={`group/table-row hover:cursor-pointer`}
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
