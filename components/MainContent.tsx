import { cn } from "@/lib/utils";
import React from "react";

const MainContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={cn("w-full h-full flex-1 overflow-y-auto p-4", className)}>
      {children}
    </main>
  );
};

export default MainContent;
