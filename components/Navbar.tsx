import { auth } from "@/auth";
import { ClientNavbar } from "./ClientNavbar";
import { handleSignOut, handleSignIn } from "@/lib/actions";

export const Navbar = async () => {
  const session = await auth();

  return (
    <ClientNavbar
      session={session}
      handleSignOut={handleSignOut}
      handleSignIn={handleSignIn}
    />
  );
};
