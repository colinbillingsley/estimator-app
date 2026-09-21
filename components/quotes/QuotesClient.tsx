"use client";

import React from "react";

import Filters from "../Filters";
import SearchBar from "../SearchBar";
import { ColumnDef, convertToCurrency, DataTable } from "../DataTable";
import { Quote } from "@/types";

import {
  PencilLineIcon,
  ClockIcon,
  FileTextIcon,
  CalendarDotsIcon,
  XCircleIcon,
  MedalIcon,
} from "@phosphor-icons/react";

import { QuoteStatusBadge } from "./QuoteStatusBadge";
import { QuoteActions } from "./QuoteActions";
import { StatCard } from "../StatCard";

import dayjs from "dayjs";

type DateRangeFilter =
  | "all"
  | "today"
  | "this_week"
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "last_quarter"
  | "this_year"
  | "last_year";

const quoteStatusFilters = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Awarded",
    value: "awarded",
  },
  {
    name: "Awaiting Response",
    value: "awaiting_response",
  },
  {
    name: "Draft",
    value: "draft",
  },
  {
    name: "Lost",
    value: "lost",
  },
];

const dateRangeFilters = [
  {
    name: "All Dates",
    value: "all",
  },
  {
    name: "Today",
    value: "today",
  },
  {
    name: "This Week",
    value: "this_week",
  },
  {
    name: "This Month",
    value: "this_month",
  },
  {
    name: "Last Month",
    value: "last_month",
  },
  {
    name: "This Year",
    value: "this_year",
  },
  {
    name: "Last Year",
    value: "last_year",
  },
];

const columns: ColumnDef<Quote>[] = [
  {
    header: "Job Title",
    cell: (quote) => quote.name,
  },
  {
    header: "Client",
    cell: (quote) => quote.companyName,
  },
  {
    header: "Amount",
    cell: (quote) => convertToCurrency(quote.amount),
  },
  {
    header: "Date Created",
    cell: (quote) => quote.dateCreated.toLocaleDateString(),
  },
  {
    header: "Status",
    cell: (quote) => <QuoteStatusBadge status={quote.status} />,
  },
  {
    header: "Actions",
    cell: (quote) => <QuoteActions quote={quote} />,
  },
];

function getDateRange(
  filter: DateRangeFilter,
  now = dayjs(),
): {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
} {
  switch (filter) {
    case "today":
      return {
        start: now.startOf("day"),
        end: now.endOf("day"),
      };

    case "this_week":
      return {
        start: now.startOf("week"),
        end: now.endOf("week"),
      };

    case "this_month":
      return {
        start: now.startOf("month"),
        end: now.endOf("month"),
      };

    case "last_month":
      return {
        start: now.subtract(1, "month").startOf("month"),
        end: now.subtract(1, "month").endOf("month"),
      };

    case "this_year":
      return {
        start: now.startOf("year"),
        end: now.endOf("year"),
      };

    case "last_year":
      return {
        start: now.subtract(1, "year").startOf("year"),
        end: now.subtract(1, "year").endOf("year"),
      };

    case "all":
    default:
      return {
        start: null,
        end: null,
      };
  }
}

function formatDateRange(filter: DateRangeFilter, now = dayjs()): string {
  if (filter === "all") {
    return "All Time";
  } else if (filter === "today") return now.format("MMMM DD, YYYY");

  const { start, end } = getDateRange(filter, now);

  if (!start || !end) {
    return "All Time";
  }

  return `${start.format("MMMM DD, YYYY")} - ${end.format("MMMM DD, YYYY")}`;
}

const QuotesClient = ({ data }: { data: Quote[] }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("all");

  // Overview and table have independent date filters
  const [overviewDateRange, setOverviewDateRange] =
    React.useState<DateRangeFilter>("all");

  const [quoteDateFilter, setQuoteDateFilter] =
    React.useState<DateRangeFilter>("all");

  const [selectedQuoteIds, setSelectedQuoteIds] = React.useState<Set<string>>(
    new Set(),
  );

  const now = dayjs();

  /*
   * ---------------------------------------------------------
   * OVERVIEW DATA
   * ---------------------------------------------------------
   */

  const overviewRange = React.useMemo(
    () => getDateRange(overviewDateRange, now),
    [overviewDateRange, now],
  );

  const overviewData = React.useMemo(() => {
    if (!overviewRange.start || !overviewRange.end) {
      return data;
    }

    return data.filter((quote) => {
      const dateCreated = dayjs(quote.dateCreated);

      return (
        dateCreated.valueOf() >= overviewRange.start!.valueOf() &&
        dateCreated.valueOf() <= overviewRange.end!.valueOf()
      );
    });
  }, [data, overviewRange]);

  const totalQuotes = overviewData.length;

  const awardedQuotes = overviewData.filter(
    (quote) => quote.status === "awarded",
  );

  const lostQuotes = overviewData.filter((quote) => quote.status === "lost");

  const awaitingResponseQuotes = overviewData.filter(
    (quote) => quote.status === "awaiting_response",
  );

  const draftQuotes = overviewData.filter((quote) => quote.status === "draft");

  const awardedAmount = awardedQuotes.reduce(
    (total, quote) => total + quote.amount,
    0,
  );

  const lostAmount = lostQuotes.reduce(
    (total, quote) => total + quote.amount,
    0,
  );

  const awaitingResponseAmount = awaitingResponseQuotes.reduce(
    (total, quote) => total + quote.amount,
    0,
  );

  /*
   * ---------------------------------------------------------
   * TABLE DATA
   * ---------------------------------------------------------
   */

  const quoteTableDateRange = React.useMemo(
    () => getDateRange(quoteDateFilter, now),
    [quoteDateFilter, now],
  );

  const filteredData = React.useMemo(() => {
    let filtered = data;

    // Search
    if (searchValue.trim()) {
      const search = searchValue.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.companyName.toLowerCase().includes(search),
      );
    }

    // Status
    if (selectedFilter !== "all") {
      filtered = filtered.filter((item) => item.status === selectedFilter);
    }

    // Date
    if (quoteTableDateRange.start && quoteTableDateRange.end) {
      filtered = filtered.filter((quote) => {
        const dateCreated = dayjs(quote.dateCreated);

        return (
          dateCreated.valueOf() >= quoteTableDateRange.start!.valueOf() &&
          dateCreated.valueOf() <= quoteTableDateRange.end!.valueOf()
        );
      });
    }

    return filtered;
  }, [data, searchValue, selectedFilter, quoteTableDateRange]);

  const filtersUsed =
    searchValue.trim() !== "" ||
    selectedFilter !== "all" ||
    quoteDateFilter !== "all";

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* =====================================================
          OVERVIEW
      ====================================================== */}
      <div className="space-y-4 rounded-md border-2 bg-white p-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Overview</h3>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarDotsIcon size={18} weight="light" className="shrink-0" />

              <span className="text-xs">
                {formatDateRange(overviewDateRange, now)}
              </span>
            </div>
          </div>

          <Filters
            title="Date"
            filters={dateRangeFilters}
            value={overviewDateRange}
            onChange={(value) => setOverviewDateRange(value as DateRangeFilter)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            label="Total Quotes"
            value={totalQuotes}
            icon={<FileTextIcon size={22} />}
            description="All quotes"
          />

          <StatCard
            label="Drafts"
            value={draftQuotes.length}
            icon={<PencilLineIcon size={22} />}
            description="Not yet submitted"
          />

          <StatCard
            label="Awaiting Response"
            value={awaitingResponseQuotes.length}
            icon={<ClockIcon size={22} />}
            description={`${convertToCurrency(awaitingResponseAmount)} pending`}
          />

          <StatCard
            label="Awarded"
            value={awardedQuotes.length}
            icon={<MedalIcon size={22} />}
            description={`${convertToCurrency(awardedAmount)} won`}
          />

          <StatCard
            label="Lost"
            value={lostQuotes.length}
            icon={<XCircleIcon size={22} />}
            description={`${convertToCurrency(lostAmount)} lost`}
          />
        </div>
      </div>

      {/* =====================================================
          QUOTES TABLE
      ====================================================== */}
      <div className="space-y-4 rounded-md border-2 bg-white p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              {filtersUsed ? "Filtered Quotes" : "All Quotes"}
            </h3>

            <span className="rounded-full bg-primary/50 px-2 py-1 text-sm text-primary-foreground">
              {filteredData.length} total results
            </span>
          </div>

          {/* Selection toolbar */}
          {selectedQuoteIds.size > 0 && (
            <div className="flex items-center justify-between rounded-md bg-muted px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="block text-sm font-medium">
                  {selectedQuoteIds.size}{" "}
                  {selectedQuoteIds.size === 1 ? "quote" : "quotes"} selected
                </span>

                <button
                  onClick={() => setSelectedQuoteIds(new Set())}
                  className="rounded-md transition-all duration-200 hover:cursor-pointer hover:bg-accent"
                >
                  <span className="block px-4 py-2 text-sm font-medium underline underline-offset-2 transition-all duration-200 hover:underline-offset-4">
                    Deselect All
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-md bg-destructive px-4 py-2 text-xs text-white">
                  <span>Delete</span>
                  <span>({selectedQuoteIds.size})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table filters */}
        <div className="flex w-full items-center gap-2">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            className="border-border"
            placeholder="Search by titles or clients..."
          />

          <Filters
            title="Status"
            filters={quoteStatusFilters}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />

          <Filters
            title="Date"
            filters={dateRangeFilters}
            value={quoteDateFilter}
            onChange={(value) => setQuoteDateFilter(value as DateRangeFilter)}
          />
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          selectable
          getRowId={(quote) => quote.id}
          selectedIds={selectedQuoteIds}
          onSelectedIdsChange={setSelectedQuoteIds}
          getRowHref={(quote) => `/quotes/${quote.id}`}
          emptyMessage="No quotes found."
        />
      </div>
    </div>
  );
};

export default QuotesClient;
