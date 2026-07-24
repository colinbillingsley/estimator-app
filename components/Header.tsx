import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";
const dayjs = require("dayjs");

const Header = async () => {
  const { orgId } = await auth();
  // Use `auth.protect()` to redirect the user to the sign-in page if they are not signed in
  await auth.protect();

  // Use `currentUser()` to get the Backend `User` object
  const user = await currentUser();
  if (!user) return null;

  // Check if there is an Active Organization
  if (!orgId) return <p>Set an Active Organization to access this page.</p>;

  // Initialize clerkClient
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const currentDate = dayjs().format("dddd, MMMM D");
  return (
    <div className={cn(`p-2 w-full`)}>
      <p className={cn(`text-sm font-semibold mb-4`)}>{organization.name}</p>
      <p className={cn(`w-full`)}>{currentDate}</p>
      <p className={cn(`text-2xl font-bold`)}>
        Good morning, {user.firstName}!
      </p>
    </div>
  );
};

export default Header;
