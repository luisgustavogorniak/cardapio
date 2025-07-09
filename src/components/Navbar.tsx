import Link from "next/link";
import { Button } from "./ui/button";
import { Home, LogIn, LogOut, UtensilsCrossed } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack";
// import { getUserDetails } from "@/actions/user.action";
import { UserButton } from "@stackframe/stack";

export const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  // const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}

          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              🍽️ Cardápio
            </Link>
          </div>

          {/* Navbar components */}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/itens">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="hidden lg:inline">Itens</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <ModeToggle />

            {/* Sign In/Out button */}

            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>

                <UserButton />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
