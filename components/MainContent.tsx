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
    <main className={cn(`w-full min-h-screen h-full p-2`, className)}>
      {children}
    </main>
  );
};

export default MainContent;
