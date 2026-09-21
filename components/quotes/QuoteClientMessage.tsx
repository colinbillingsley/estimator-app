"use client";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import type { QuoteFormValues } from "@/schemas/quote";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

export function QuoteClientMessage({
  includeClientMessage,
  setIncludeClientMessage,
}: {
  includeClientMessage: boolean;
  setIncludeClientMessage: (include: boolean) => void;
}) {
  const { register } = useFormContext<QuoteFormValues>();

  return (
    <section className="flex flex-col gap-4 border p-4 overflow-hidden bg-white">
      <div className="flex items-center gap-6">
        <Switch
          id="includeClientMessage"
          checked={includeClientMessage}
          onCheckedChange={setIncludeClientMessage}
        />
        <div>
          <h2 className="font-heading text-lg font-semibold">Client Message</h2>
          <p className="text-sm text-muted-foreground">
            Add a message that will be included with the quote sent to the
            client.
          </p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 max-h-96 overflow-hidden opacity-100 transition-all duration-[400ms]",
          !includeClientMessage && "max-h-0 opacity-0",
        )}
      >
        <label htmlFor="clientMessage" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="clientMessage"
          tabIndex={includeClientMessage ? 0 : -1}
          placeholder="Thank you for the opportunity to provide this quote. Please let us know if you have any questions."
          className="min-h-32 resize-y"
          {...register("clientMessage")}
        />
      </div>
    </section>
  );
}
