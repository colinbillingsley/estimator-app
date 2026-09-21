"use client";

import { useMemo, useState } from "react";

import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { ColumnDef, DataTable } from "../DataTable";
import { Client } from "@/types";
import {
  AddressBookIcon,
  BriefcaseIcon,
  CalendarDotsIcon,
  PlusIcon,
  UserCircleCheckIcon,
  UserCircleMinusIcon,
} from "@phosphor-icons/react";
import { ClientStatusBadge } from "./ClientStatusBadge";
import { ClientActions } from "./ClientActions";
import { Button } from "../ui/button";
import H1 from "../H1";
import { StatCard } from "../StatCard";

import dayjs from "dayjs";

const clientStatusFilters = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Active",
    value: "active",
  },
  {
    name: "Inactive",
    value: "inactive",
  },
  {
    name: "Archived",
    value: "archived",
  },
];

const columns: ColumnDef<Client>[] = [
  {
    header: "Client",
    cell: (client) => {
      const primaryContact = client.contacts.find(
        (contact) => contact.isPrimary,
      );

      return (
        <div className="flex flex-col">
          <span className="font-medium">{client.companyName}</span>

          {primaryContact && (
            <span className="text-sm text-muted-foreground">
              {primaryContact.firstName} {primaryContact.lastName}
            </span>
          )}
        </div>
      );
    },
  },

  {
    header: "Contact",
    cell: (client) => {
      const primaryContact = client.contacts.find(
        (contact) => contact.isPrimary,
      );

      if (!primaryContact) {
        return (
          <span className="text-muted-foreground">No primary contact</span>
        );
      }

      return (
        <div className="flex flex-col">
          {primaryContact.email && <span>{primaryContact.email}</span>}

          {primaryContact.phone && (
            <span className="text-sm text-muted-foreground">
              {primaryContact.phone}
            </span>
          )}
        </div>
      );
    },
  },

  {
    header: "Jobs",
    cell: (client) => <span>{client.jobCount}</span>,
  },

  {
    header: "Quotes",
    cell: (client) => <span>{client.quoteCount}</span>,
  },

  {
    header: "Location",
    cell: (client) => {
      const primaryAddress = client.addresses.find(
        (address) => address.isPrimary,
      );

      if (!primaryAddress) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <div className="flex flex-col">
          <span>
            {primaryAddress.city}, {primaryAddress.state}
          </span>

          <span className="text-sm text-muted-foreground">
            {primaryAddress.zipCode}
          </span>
        </div>
      );
    },
  },

  {
    header: "Status",
    cell: (client) => <ClientStatusBadge status={client.status} />,
  },

  {
    header: "",
    cell: (client) => <ClientActions client={client} />,
  },
];

type ClientsClientProps = {
  clients: Client[];
};

export default function ClientsClient({ clients }: ClientsClientProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Controlled table selection
  const [selectedClientIds, setSelectedClientIds] = useState<Set<string>>(
    new Set(),
  );

  const filteredClients = useMemo(() => {
    let filtered = clients;

    if (searchValue.trim()) {
      filtered = filtered.filter((item) =>
        item.companyName.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter((item) => item.status === selectedFilter);
    }

    return filtered;
  }, [clients, searchValue, selectedFilter]);

  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status === "active",
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "inactive",
  ).length;

  const totalJobs = clients.reduce(
    (total, client) => total + client.jobCount,
    0,
  );

  const filtersUsed = searchValue.trim() !== "" || selectedFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <H1 className="mb-0">Clients</H1>

          <p className="text-sm text-muted-foreground">
            Manage your clients, contacts, and job relationships.
          </p>
        </div>

        <Button>
          <PlusIcon weight="bold" />
          New Client
        </Button>
      </div>

      {/* Stats */}
      <div className="space-y-4 rounded-md border-2 bg-white p-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Overview</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Clients"
            value={totalClients}
            icon={<AddressBookIcon size={22} />}
            description="All clients"
          />

          <StatCard
            label="Active Clients"
            value={activeClients}
            icon={<UserCircleCheckIcon size={22} />}
            description="Currently active"
          />

          <StatCard
            label="Inactive Clients"
            value={inactiveClients}
            icon={<UserCircleMinusIcon size={22} />}
            description="Not currently active"
          />

          <StatCard
            label="Total Jobs"
            value={totalJobs}
            icon={<BriefcaseIcon size={22} />}
            description="Across all clients"
          />
        </div>
      </div>

      {/* Clients */}
      <div className="space-y-4 rounded-md border-2 bg-white p-6">
        {/* Table heading */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              {filtersUsed ? "Filtered Clients" : "All Clients"}
            </h3>

            <span className="rounded-full bg-primary/50 px-2 py-1 text-sm text-primary-foreground">
              {filteredClients.length} total results
            </span>
          </div>

          {/* Selection toolbar */}
          {selectedClientIds.size > 0 && (
            <div className="flex items-center justify-between rounded-md bg-muted px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="block text-sm font-medium">
                  {selectedClientIds.size}{" "}
                  {selectedClientIds.size === 1 ? "quote" : "quotes"} selected
                </span>
                <button
                  onClick={() => setSelectedClientIds(new Set())}
                  className="hover:cursor-pointer rounded-md hover:bg-accent transition-all duration-200"
                >
                  <span className="block px-4 py-2 font-medium text-sm underline underline-offset-2 hover:underline-offset-4 transition-all duration-200">
                    Deselect All
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-md bg-destructive px-4 py-2 text-xs text-white">
                  <span>Delete</span>
                  <span>({selectedClientIds.size})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex w-full items-center gap-2">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            className="border-border"
            placeholder="Search clients..."
          />

          <Filters
            title="Status"
            filters={clientStatusFilters}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredClients}
          selectable
          getRowId={(client) => client.id}
          selectedIds={selectedClientIds}
          onSelectedIdsChange={setSelectedClientIds}
          getRowHref={(client) => `/clients/${client.id}`}
          emptyMessage="No clients found."
        />
      </div>
    </div>
  );
}
