"use client";
import React from "react";

import { TrashIcon } from "@phosphor-icons/react";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { QuoteFormValues } from "@/schemas/quote";
import { convertToCurrency } from "../DataTable";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type QuoteLineItemProps = {
  index: number;
  onRemove: () => void;
};

export function QuoteLineItem({ index, onRemove }: QuoteLineItemProps) {
  const { control, register } = useFormContext<QuoteFormValues>();
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const quantity = useWatch({
    control,
    name: `lineItems.${index}.quantity`,
  });

  const unitPrice = useWatch({
    control,
    name: `lineItems.${index}.unitPrice`,
  });

  const total = (Number(quantity) || 0) * (Number(unitPrice) || 0);

  return (
    <div className="space-y-4 p-4 bg-card">
      {/* Main row */}
      <div className="flex items-center gap-4 w-full flex-wrap">
        {/* Item */}
        <div className="space-y-2 grow">
          <label className="text-sm font-medium">Item</label>

          <Input
            placeholder="Electrical Rough-In"
            {...register(`lineItems.${index}.name`)}
          />
        </div>

        <div
          className={`flex flex-col w-full sm:flex-row sm:items-center gap-4`}
        >
          {/* Quantity */}
          <div className="space-y-2 grow basis-4">
            <label className="text-sm font-medium">Qty</label>

            <Input
              type="number"
              min="0"
              step="any"
              onFocus={(e) => e.currentTarget.select()}
              {...register(`lineItems.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />
          </div>

          {/* Price */}
          <div className="space-y-2 grow basis-1">
            <label className="text-sm font-medium">Price / Unit</label>

            <Input
              type="number"
              min="0"
              step="0.01"
              onFocus={(e) => e.currentTarget.select()}
              {...register(`lineItems.${index}.unitPrice`, {
                valueAsNumber: true,
              })}
            />
          </div>

          {/* Total */}
          <div className="space-y-2 grow basis-1">
            <label className="text-sm font-medium">Total</label>

            <Input type="string" value={convertToCurrency(total)} readOnly />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <Textarea
          placeholder="Description"
          {...register(`lineItems.${index}.description`)}
        />
      </div>

      {/* Remove */}
      <div className="flex items-center justify-end">
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger
            className={`flex items-center gap-2 p-2 text-red-600 border border-red-600 hover:bg-red-600/5 hover:cursor-pointer transition-all duration-200`}
          >
            <TrashIcon size={16} color="red" />
            <span className="text-xs">Delete</span>

            <span className="sr-only">Remove line item</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Line Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this line item? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => {
                  setDeleteOpen(false);
                  onRemove();
                }}
              >
                <TrashIcon size={16} color="red" />
                <span className=" text-red-600">Delete</span>

                <span className="sr-only">Delete</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
