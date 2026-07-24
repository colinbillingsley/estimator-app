import { cn } from "@/lib/utils";
import React from "react";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={cn(`w-full min-h-screen h-full p-2`)}>{children}</main>
  );
};

export default MainContent;
