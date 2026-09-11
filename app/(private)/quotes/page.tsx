import QuotesClient from "@/components/clients/JobsClient";
import H1 from "@/components/H1";
import MainContent from "@/components/MainContent";
import { Quote } from "@/types";
import { auth } from "@clerk/nextjs/server";

const Quotes = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  const quotes: Quote[] = [
    {
      id: "1",
      amount: 1139450.74,
      name: "Moco Public Safety Facility",
      generalContractor: "Reeves & Young",
      dateCreated: new Date("2024-06-30"),
      status: "Awaiting Response",
      link: "/clients/quotes/1",
    },
  ];

  return (
    <MainContent>
      <H1 className={``}>Quotes</H1>

      <div className={`w-full h-full`}>
        <QuotesClient data={quotes} />
      </div>
    </MainContent>
  );
};

export default Quotes;
