import { cn } from "@/lib/utils";
import React from "react";

const H1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1
      className={cn(
        "text-3xl font-heading font-bold tracking-tight mb-4",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default H1;
