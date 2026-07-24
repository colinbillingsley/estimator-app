import { auth } from "@clerk/nextjs/server";
import React from "react";

const Estimates = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return <div>Estimates</div>;
};

export default Estimates;
