"use client";

import { useController, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import type { QuoteFormValues } from "@/schemas/quote";

export function QuoteDetails() {
  const { control } = useFormContext<QuoteFormValues>();

  const title = useController({
    control,
    name: "title",
  });

  const clientId = useController({
    control,
    name: "clientId",
  });

  const propertyAddress = useController({
    control,
    name: "propertyAddress",
  });

  const quoteNumber = useController({
    control,
    name: "quoteNumber",
  });

  const salespersonId = useController({
    control,
    name: "salespersonId",
  });

  return (
    <section className="border border-border p-4">
      <div className={`mb-4`}>
        <h2 className="font-heading text-lg font-semibold">Quote Details</h2>

        <p className="text-sm text-muted-foreground">
          Basic information about this quote.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={`space-y-3`}>
          {/* Quote Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quote Title</label>

            <Input placeholder="Office Building Electrical" {...title.field} />

            {title.fieldState.error && (
              <p className="text-sm text-destructive">
                {title.fieldState.error.message}
              </p>
            )}
          </div>

          {/* Client */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Client</label>

            <Input placeholder="Select client" {...clientId.field} />

            {clientId.fieldState.error && (
              <p className="text-sm text-destructive">
                {clientId.fieldState.error.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Address</label>

            <Input
              placeholder="Enter property address"
              {...propertyAddress.field}
            />

            {propertyAddress.fieldState.error && (
              <p className="text-sm text-destructive">
                {propertyAddress.fieldState.error.message}
              </p>
            )}
            {clientId.fieldState.error && (
              <p className="text-sm text-destructive">
                {clientId.fieldState.error.message}
              </p>
            )}
          </div>
        </div>

        <div className={`space-y-3`}>
          {/* Quote Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quote Number</label>

            <Input placeholder="Q-1001" {...quoteNumber.field} />

            {quoteNumber.fieldState.error && (
              <p className="text-sm text-destructive">
                {quoteNumber.fieldState.error.message}
              </p>
            )}
          </div>

          {/* Salesperson */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Salesperson</label>

            <Input placeholder="Select salesperson" {...salespersonId.field} />
          </div>
        </div>
      </div>
    </section>
  );
}
