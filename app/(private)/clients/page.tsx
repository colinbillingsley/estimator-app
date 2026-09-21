import { auth } from "@clerk/nextjs/server";
import ClientsClient from "@/components/clients/ClientsClient";
import { clients } from "@/data";

const Clients = async () => {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect();

  return (
    <div>
      <div className={`w-full h-full`}>
        <ClientsClient clients={clients} />
      </div>
    </div>
  );
};

export default Clients;
