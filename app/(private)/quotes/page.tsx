import QuotesClient from "@/components/quotes/QuotesClient";
import H1 from "@/components/H1";
import { auth } from "@clerk/nextjs/server";
import { quotes } from "@/data";

const Quotes = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return (
    <div>
      <div className="mb-4">
        <H1 className={`mb-0`}>Quotes</H1>
        <span className="text-muted-foreground">
          Manage and track your estimates and bids.
        </span>
      </div>

      <div className={`w-full h-full`}>
        <QuotesClient data={quotes} />
      </div>
    </div>
  );
};

export default Quotes;
