import { z } from "zod";

export const quoteLineItemSchema = z.object({
  id: z.string(),

  name: z.string().min(1, "Item name is required"),

  description: z.string().optional(),

  quantity: z.number().min(0, "Quantity cannot be negative"),

  unitPrice: z.number().min(0, "Price cannot be negative"),

  taxable: z.boolean(),

  optional: z.boolean(),
});

export const quoteSchema = z.object({
  title: z.string().min(1, "Job title is required"),

  clientId: z.string().min(1, "Client is required"),

  quoteNumber: z.string().min(1, "Quote number is required"),

  propertyAddress: z.string().min(1, "Property address is required"),

  salespersonId: z.string().min(1, "Salesperson is required"),

  lineItems: z.array(quoteLineItemSchema),

  // Pricing
  markupRate: z.number().min(0, "Markup cannot be negative"),
  overheadRate: z.number().min(0, "Overhead cannot be negative"),

  discount: z.number().min(0, "Discount cannot be negative"),
  discountType: z.enum(["percentage", "fixed"]),

  taxRate: z.number().min(0, "Tax rate cannot be negative"),

  notes: z.string().optional(),
  clientMessage: z.string().optional(),
  terms: z.string().optional(),
  attachments: z.array(z.string()).optional(),

  status: z
    .enum(["draft", "awaiting_response", "awarded", "lost"])
    .default("draft"),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
