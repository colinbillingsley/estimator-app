"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { PercentIcon } from "@phosphor-icons/react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { QuoteFormValues } from "@/schemas/quote";
import { convertToCurrency } from "../DataTable";

export function QuotePricing() {
  const { control, register, setValue } = useFormContext<QuoteFormValues>();

  const lineItems = useWatch({
    control,
    name: "lineItems",
  });

  const markupRate = useWatch({
    control,
    name: "markupRate",
  });

  const overheadRate = useWatch({
    control,
    name: "overheadRate",
  });

  const discount = useWatch({
    control,
    name: "discount",
  });

  const discountType = useWatch({
    control,
    name: "discountType",
  });

  const taxRate = useWatch({
    control,
    name: "taxRate",
  });

  const pricing = useMemo(() => {
    const directCost = lineItems.reduce((total, item) => {
      if (item.optional) {
        return total;
      }

      return total + item.quantity * item.unitPrice;
    }, 0);

    const taxableCost = lineItems.reduce((total, item) => {
      if (item.optional || !item.taxable) {
        return total;
      }

      return total + item.quantity * item.unitPrice;
    }, 0);

    const overheadAmount = directCost * ((Number(overheadRate) || 0) / 100);

    const costWithOverhead = directCost + overheadAmount;

    const markupAmount = costWithOverhead * ((Number(markupRate) || 0) / 100);

    const subtotal = costWithOverhead + markupAmount;

    const discountAmount =
      discountType === "percentage"
        ? subtotal * ((Number(discount) || 0) / 100)
        : Number(discount) || 0;

    const discountedSubtotal = Math.max(subtotal - discountAmount, 0);

    const taxAmount = discountedSubtotal * ((Number(taxRate) || 0) / 100);

    const total = discountedSubtotal + taxAmount;

    const profit = discountedSubtotal - directCost;

    const margin =
      discountedSubtotal > 0 ? (profit / discountedSubtotal) * 100 : 0;

    return {
      directCost,
      taxableCost,
      overheadAmount,
      costWithOverhead,
      markupAmount,
      subtotal,
      discountAmount,
      discountedSubtotal,
      taxAmount,
      total,
      profit,
      margin,
    };
  }, [lineItems, markupRate, overheadRate, discount, discountType, taxRate]);

  return (
    <section className="space-y-6 p-4 border-y-2 border-border/25 bg-white">
      <div>
        <h2 className="font-heading text-lg font-semibold">Pricing</h2>

        <p className="text-sm text-muted-foreground">
          Set your markup, overhead, discounts, and tax for this quote.
        </p>
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-md space-y-4">
          {/* Direct Cost */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Direct Cost</span>

            <span className="font-medium">
              {convertToCurrency(pricing.directCost)}
            </span>
          </div>

          {/* Overhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground">Overhead</span>

            <div className="flex w-full sm:w-56 items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  onFocus={(e) => e.currentTarget.select()}
                  className="pr-8 text-right w-full"
                  {...register("overheadRate", {
                    valueAsNumber: true,
                  })}
                />

                <PercentIcon
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Overhead Amount */}
          {pricing.overheadAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overhead Amount</span>

              <span className="font-medium text-green-600">
                + {convertToCurrency(pricing.overheadAmount)}
              </span>
            </div>
          )}

          {/* Markup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground">Markup</span>

            <div className="flex w-full sm:w-56 items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  className="pr-8 text-right"
                  onFocus={(e) => e.currentTarget.select()}
                  {...register("markupRate", {
                    valueAsNumber: true,
                  })}
                />

                <PercentIcon
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Markup Amount */}
          {pricing.markupAmount > 0 && (
            <div className="flex items-center justify-between text-sm text-green-600">
              <span className="text-muted-foreground">Markup Amount</span>

              <span className="font-medium">
                + {convertToCurrency(pricing.markupAmount)}
              </span>
            </div>
          )}

          {/* Subtotal */}
          <div className="flex items-center justify-between border-t pt-4 text-sm">
            <span className="font-medium">Subtotal</span>

            <span className="font-semibold">
              {convertToCurrency(pricing.subtotal)}
            </span>
          </div>

          {/* Discount */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground">Discount</span>

            <div className="flex w-full sm:w-56 gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  onFocus={(e) => e.currentTarget.select()}
                  className="pr-8 text-right"
                  {...register("discount", {
                    valueAsNumber: true,
                  })}
                />

                {discountType === "percentage" && (
                  <PercentIcon
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                )}
              </div>

              <Select
                value={discountType}
                onValueChange={(value) => {
                  if (value) {
                    setValue("discountType", value as "percentage" | "fixed");
                  }
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="percentage">%</SelectItem>

                  <SelectItem value="fixed">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Discount Amount */}
          {pricing.discountAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Discount Amount</span>

              <span className="font-medium text-destructive">
                -{convertToCurrency(pricing.discountAmount)}
              </span>
            </div>
          )}

          {/* Tax */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground">Tax</span>

            <div className="flex w-full sm:w-56 items-center gap-2">
              <Input
                type="number"
                min="0"
                step="0.01"
                onFocus={(e) => e.currentTarget.select()}
                className="text-right"
                {...register("taxRate", {
                  valueAsNumber: true,
                })}
              />

              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>

          {/* Tax Amount */}
          {pricing.taxAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax Amount</span>

              <span className="font-medium">
                {convertToCurrency(pricing.taxAmount)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-heading text-base font-semibold">
                Total
              </span>

              <span className="font-heading text-xl font-semibold">
                {convertToCurrency(pricing.total)}
              </span>
            </div>
          </div>

          {/* Internal Profit */}
          <div className="bg-muted p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Profit</span>

              <span className="font-medium">
                {convertToCurrency(pricing.profit)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Margin</span>

              <span className="font-medium">{pricing.margin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
