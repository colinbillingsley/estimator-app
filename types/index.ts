export type Filter = {
  name: string;
  value: string;
};

export type Quote = {
  id: string;
  amount: number;
  name: string;
  companyName: string;
  dateCreated: Date;
  status: QuoteStatus;
  link?: string;
};

export type QuoteStatus = "awaiting_response" | "awarded" | "lost" | "draft";

export type ClientStatus = "active" | "inactive" | "archived";

export type Client = {
  id: string;
  companyName: string;
  status: ClientStatus;
  dateCreated: Date;

  contacts: ClientContact[];
  addresses: ClientAddress[];

  jobCount: number;
  quoteCount: number;
};

export type ClientAddress = {
  id: string;
  clientId: string;

  label?: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;

  isPrimary: boolean;
};

export type ClientContact = {
  id: string;
  clientId: string;

  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  phone?: string;

  isPrimary: boolean;
};

type Job = {
  id: string;
  clientId: string;
  name: string;
  address: JobAddress;
  status: JobStatus;
  dateCreated: Date;
};

export type JobAddress = {
  street: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
};

export type JobStatus = "prospect" | "active" | "completed" | "cancelled";
