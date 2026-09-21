"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusIcon, RowsPlusBottomIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import type { QuoteFormValues } from "@/schemas/quote";

import { QuoteLineItem } from "./QuoteLineItem";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function QuoteLineItems() {
  const { control } = useFormContext<QuoteFormValues>();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  function addItem() {
    append({
      id: crypto.randomUUID(),

      name: "",
      description: "",

      quantity: 1,

      unitPrice: 0,

      taxable: true,
      optional: false,
    });
  }

  function removeItem(index: number) {
    const id = fields[index].id;

    setRemovingId(id);

    setTimeout(() => {
      remove(index);
      setRemovingId(null);
    }, 300);
  }

  return (
    <section className="space-y-6 border p-4 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold">Line Items</h2>

          <p className="text-sm text-muted-foreground">
            Add the work, materials, and services included in this quote.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="hover:cursor-pointer"
          onClick={addItem}
        >
          <RowsPlusBottomIcon size={16} />
          Add Item
        </Button>
      </div>

      {/* Items */}
      <div
        className={cn(
          "border bg-background/50",
          fields.length === 0 && "border-dashed",
        )}
      >
        {fields.length > 0 ? (
          <div className="divide-y">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "animate-line-item-in overflow-hidden transition-all duration-200",
                  removingId === field.id && "translate-x-8 opacity-0",
                )}
              >
                <QuoteLineItem
                  index={index}
                  onRemove={() => removeItem(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No line items have been added.
            </p>

            <button
              className={`flex items-center gap-2 bg-primary text-sm text-primary-foreground px-4 py-2 hover:bg-primary/80 hover:cursor-pointer group/add-first-item mt-2 transition-all duration-200`}
              onClick={addItem}
            >
              <PlusIcon
                weight="bold"
                size={20}
                className="group-hover/add-first-item:rotate-45 transition-transform duration-[300ms]"
              />
              Add your first item
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
