import { ClientStatus } from "@/types/index";
import { Badge } from "@/components/ui/badge";

type ClientStatusBadgeProps = {
  status: ClientStatus;
};

const statusConfig = {
  active: {
    label: "Active",
    variant: "active",
  },
  inactive: {
    label: "Inactive",
    variant: "inactive",
  },
  archived: {
    label: "Archived",
    variant: "archived",
  },
} satisfies Record<
  ClientStatus,
  {
    label: string;
    variant: "active" | "inactive" | "archived";
  }
>;

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
