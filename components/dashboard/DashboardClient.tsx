"use client";
import React from "react";
import MainContent from "../MainContent";
import DashStatsCard from "./DashStatsCards";
import DeadlinesCard from "./DeadlinesCard";

const DashboardClient = () => {
  const [bidsDueToday, setBidsDueToday] = React.useState([
    "Woodland Hills",
    "Range USA",
  ]);
  const [bidsDueThisWeek, setBidsDueThisWeek] = React.useState([
    "Station Pizza",
    "Fogo De Chao",
    "BJ's Restaurant & Brewhouse",
  ]);

  return (
    <MainContent className={`space-y-8`}>
      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>Stats</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          <DashStatsCard title="Active Bids" content={8} />
          <DashStatsCard title="Bids Due Soon" content={2} />
          <DashStatsCard title="Quotes to Send" content={3} />
          <DashStatsCard title="Pending Quotes" content={5} />
        </div>
      </div>

      <div className={`space-y-2`}>
        <h2 className={`text-xl font-semibold font-heading`}>
          Deadlines/Priorites
        </h2>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-2`}>
          <DeadlinesCard
            title="Bids Due Today"
            content={bidsDueToday}
            description={`Bids due today: ${bidsDueToday.length}`}
          />
          <DeadlinesCard
            title="Bids Due This Week"
            content={bidsDueThisWeek}
            description={`Bids due this week: ${bidsDueThisWeek.length}`}
          />
        </div>
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

export default DashboardClient;
