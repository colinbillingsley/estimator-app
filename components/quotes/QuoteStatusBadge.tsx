import { QuoteStatus } from "@/types/index";
import { Badge } from "@/components/ui/badge";

type QuoteStatusBadgeProps = {
  status: QuoteStatus;
};

const statusConfig = {
  awarded: {
    label: "Awarded",
    variant: "awarded",
  },
  awaiting_response: {
    label: "Awaiting Response",
    variant: "awaiting_response",
  },
  lost: {
    label: "Lost",
    variant: "lost",
  },
  draft: {
    label: "Draft",
    variant: "draft",
  },
} satisfies Record<
  QuoteStatus,
  {
    label: string;
    variant: "awarded" | "awaiting_response" | "lost" | "draft";
  }
>;

export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
