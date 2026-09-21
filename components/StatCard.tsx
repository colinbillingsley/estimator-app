import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
};

export function StatCard({ label, value, icon, description }: StatCardProps) {
  return (
    <div className="border-2 border-border rounded-md bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="text-2xl font-semibold tracking-tight">{value}</p>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  );
}
