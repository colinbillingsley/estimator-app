import { auth } from "@clerk/nextjs/server";
import DashboardClient from "@/components/dashboard/DashboardClient";

const Dashboard = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return <DashboardClient />;
};

export default Dashboard;
