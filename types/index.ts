export type Filter = {
  name: string;
  value: string;
};

export type Quote = {
  id: string;
  amount: number;
  name: string;
  generalContractor: string;
  dateCreated: Date;
  status: string;
  link?: string;
};

export type QuoteStatus = "awaiting_response" | "awarded" | "lost" | "draft";
