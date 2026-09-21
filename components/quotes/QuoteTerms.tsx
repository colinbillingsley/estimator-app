"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import type { QuoteFormValues } from "@/schemas/quote";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

export function QuoteTerms({
  includeTerms,
  setIncludeTerms,
}: {
  includeTerms: boolean;
  setIncludeTerms: (include: boolean) => void;
}) {
  const { register } = useFormContext<QuoteFormValues>();

  return (
    <section className="flex flex-col gap-4 border p-4 overflow-hidden bg-white">
      <div className="flex items-center gap-6">
        <Switch
          id="includeTerms"
          checked={includeTerms}
          onCheckedChange={setIncludeTerms}
        />

        <div>
          <h2 className="font-heading text-lg font-semibold">
            Terms & Conditions
          </h2>

          <p className="text-sm text-muted-foreground">
            Add the terms and conditions that will be included with this quote.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-2 max-h-96 opacity-100 overflow-hidden transition-all duration-[400ms]",
          !includeTerms && "max-h-0 opacity-0",
        )}
      >
        <label htmlFor="terms" className="text-sm font-medium">
          Terms
        </label>

        <Textarea
          id="terms"
          placeholder="Enter the terms and conditions for this quote..."
          className="min-h-40 resize-y"
          {...register("terms")}
        />
      </div>
    </section>
  );
}
