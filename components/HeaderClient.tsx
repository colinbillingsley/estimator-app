"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import CreateNewButton from "./CreateNewButton";

const HeaderClient = ({ user, organization, currentDate }: any) => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className={cn("p-2 w-full flex items-center justify-between")}>
      <div className="w-full">
        <p className="text-sm font-semibold mb-4">{organization.name}</p>
        <p>{currentDate}</p>
        <p className="text-2xl font-bold">Good morning, {user.firstName}!</p>
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
