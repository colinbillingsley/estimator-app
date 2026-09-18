"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import CreateNewButton from "./CreateNewButton";

const HeaderClient = ({ user, organization, currentDate }: any) => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div
      className={cn(
        "p-6 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border",
      )}
    >
      <div className="w-full">
        <p className="text-base sm:text-lg font-semibold">
          {organization.name}
        </p>
        <p className="text-xl sm:text-2xl font-bold">
          Good morning, {user.firstName}!
        </p>
        <p className={`text-sm sm:text-base`}>{currentDate}</p>
      </div>

      <div>
        <CreateNewButton
          createOpen={createOpen}
          setCreateOpen={setCreateOpen}
        />
      </div>
    </div>
  );
};

export default HeaderClient;
