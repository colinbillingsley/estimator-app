import React from "react";
import { auth } from "@clerk/nextjs/server";
import DashCards from "@/components/dashboard/DashCards";
import MainContent from "@/components/MainContent";

const Dashboard = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <MainContent className={`space-y-8`}>
      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>Stats</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          <DashCards title="Active Bids" content={8} />
          <DashCards title="Bids Due Soon" content={2} />
          <DashCards title="Quotes to Send" content={3} />
          <DashCards title="Pending Quotes" content={5} />
        </div>
      </div>

      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>Priorities</h2>
        <div></div>
      </div>

      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>
          Pipeline Overview
        </h2>
        <div></div>
      </div>

      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>
          Active Projects
        </h2>
        <div></div>
      </div>
    </MainContent>
  );
};

export default Dashboard;
