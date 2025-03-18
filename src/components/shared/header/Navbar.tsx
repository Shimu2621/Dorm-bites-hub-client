"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import Link from "next/link";
import { ModeToggle } from "../toggle/ModeToggle";
import Container from "@/utils/container/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const router = useRouter();
  const { user, logOut } = useAuth();
  console.log("User Data:", user);
  console.log("User Properties:", {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  });

  const handleLogout = async () => {
    await logOut()
      .then(() => {
        console.log("Logged out successfully");
        toast.success("Logged out successfully");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Error logging");
      });
  };

  return (
    <Card className="mx-auto bg-background py-3 px-3 border-0 flex items-center justify-between gap-10 rounded-none">
      <Container className="flex items-center justify-center w-full">
        {/* Logo */}
        <div className="flex justify-between items-center relative w-full">
          <Image
            src="/logo/dormlogo.png"
            alt="Dorm Bites Hub Logo"
            width={50}
            height={50}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="absolute left-13 text-xl italic font-bold text-gray-color">
            ormBites Hub
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 font-bold text-gray-color">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li className="w-[127px]">
            <Link href="/upcomingMeals">Upcoming Meals</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Authentication Section */}
        <div className="flex items-center pl-16 gap-8">
          {user && user.photoURL ? (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-14 h-14 relative">
                    <Image
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User Profile"
                      width={56}
                      height={56}
                      className="w-full h-full rounded-full object-cover cursor-pointer"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="p-3 bg-white border shadow-md rounded-lg">
                  <p className="text-sm text-black font-semibold">
                    {user.displayName || "User"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={handleLogout}
                >
                  {user?.displayName}
                </DropdownMenuItem>
                <Link href="/admin">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-2">
                    Admin Panel
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-200 p-2"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Navigation Menu */}
          <div className="flex md:hidden mr-2 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="py-2 px-2 bg-gray-100 rounded-md">Pages</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {landings.map((page) => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/home">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/meals">Meals</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/upcomingMeals">Upcoming Meals</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Login
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </Container>
    </Card>
  );
};

const landings = [
  { id: nanoid(), title: "Landing 01", route: "/project-management" },
  { id: nanoid(), title: "Landing 02", route: "/crm-landing" },
  { id: nanoid(), title: "Landing 03", route: "/ai-content-landing" },
  { id: nanoid(), title: "Landing 04", route: "/new-intro-landing" },
  { id: nanoid(), title: "Landing 05", route: "/about-us-landing" },
  { id: nanoid(), title: "Landing 06", route: "/contact-us-landing" },
  { id: nanoid(), title: "Landing 07", route: "/faqs-landing" },
  { id: nanoid(), title: "Landing 08", route: "/pricing-landing" },
  { id: nanoid(), title: "Landing 09", route: "/career-landing" },
];

export default Navbar;
