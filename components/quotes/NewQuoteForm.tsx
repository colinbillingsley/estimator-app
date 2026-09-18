"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { quoteSchema, type QuoteFormValues } from "@/schemas/quote";

import { QuoteDetails } from "./QuoteDetails";
import { QuoteLineItems } from "./QuoteLineItems";
import { QuotePricing } from "./QuotePricing";
import { QuoteClientMessage } from "./QuoteClientMessage";
import { QuoteTerms } from "./QuoteTerms";
import { useState } from "react";

import { useRouter } from "next/navigation";

export function NewQuoteForm() {
  const [includeClientMessage, setIncludeClientMessage] = useState(false);
  const [includeTerms, setIncludeTerms] = useState(false);

  const router = useRouter();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),

    defaultValues: {
      title: "",
      clientId: "",
      quoteNumber: "",
      salespersonId: "",

      lineItems: [],

      markupRate: 0,
      overheadRate: 0,

      discount: 0,
      discountType: "percentage",

      taxRate: 0,

      notes: "",
      clientMessage: "",
      terms: "",
      attachments: [],

      status: "draft",
    },
  });

  function onSubmit(values: QuoteFormValues) {
    console.log(values);
  }

  function onCancel() {
    setIncludeClientMessage(false);
    setIncludeTerms(false);
    form.reset();

    router.push("/quotes", { scroll: true });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-semibold">New Quote</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a quote for a client.
          </p>
        </div>

        {/* Quote Details */}
        <QuoteDetails />

        {/* Line Items */}
        <QuoteLineItems />

        {/* Pricing */}
        <QuotePricing />

        {/* Client Message */}
        <QuoteClientMessage
          includeClientMessage={includeClientMessage}
          setIncludeClientMessage={setIncludeClientMessage}
        />

        {/* Terms */}
        <QuoteTerms
          includeTerms={includeTerms}
          setIncludeTerms={setIncludeTerms}
        />

        {/* Attachments */}
        {/* <QuoteAttachments /> */}

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>

          <Button type="submit" size="lg">
            Save Quote
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
