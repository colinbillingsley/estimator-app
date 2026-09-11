import { auth } from "@clerk/nextjs/server";
import React from "react";

const Supplier_Quotes = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return <div>Supplier Quotes</div>;
};

export default Supplier_Quotes;
