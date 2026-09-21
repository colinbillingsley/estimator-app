import React from "react";
import { NewQuoteForm } from "@/components/quotes/NewQuoteForm";

const CreateQuote = () => {
  const numberOfQuotes: number = 101;
  return (
    <div>
      <NewQuoteForm numberOfQuotes={numberOfQuotes} />
    </div>
  );
};

export default CreateQuote;
