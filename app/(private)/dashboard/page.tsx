import React from "react";
import { auth } from "@clerk/nextjs/server";
import DashCards from "@/components/dashboard/DashCards";
import MainContent from "@/components/MainContent";

const Dashboard = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return (
    <MainContent>
      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold`}>Stats</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          <DashCards
            title="Active Bids"
            description="Number of jobs currently bidding"
            content={"3"}
            footer="How many are due this week?"
          />
          <DashCards
            title="Pending Quotes"
            description="Quotes that have been sent but not yet received back"
            content={"6"}
            footer="How many are pending?"
          />
          <DashCards
            title="Bids Due Soon"
            description="Number of jobs that are due soon"
            content={"2"}
            footer="How many are due soon?"
          />
        </div>
      </div>
    </MainContent>
  );
};

export default Dashboard;
