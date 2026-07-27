// Header.tsx (Server)
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import HeaderClient from "./HeaderClient";

// Header.tsx (Server)

const Header = async () => {
  const { orgId } = await auth();
  await auth.protect();

  const user = await currentUser();
  if (!user) return null;

  if (!orgId) return <p>Set an Active Organization</p>;

  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const currentDate = dayjs().format("dddd, MMMM D");

  return (
    <HeaderClient
      user={{
        firstName: user.firstName,
      }}
      organization={{
        name: organization.name,
      }}
      currentDate={currentDate}
    />
  );
};

export default Header;
