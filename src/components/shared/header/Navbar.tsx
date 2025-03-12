import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
//   import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
//   import ShadcnKit from "@/components/icons/shadcn-kit";
import { nanoid } from "nanoid";
import Link from "next/link";
import { ModeToggle } from "../toggle/ModeToggle";
import Container from "@/utils/container/Container";
import Image from "next/image";

const Navbar = () => {
  return (
    <Card className="mx-auto bg-background py-3 px-3 border-0 flex items-center justify-between gap-10 rounded-none">
      {/* <ShadcnKit className="text-primary cursor-pointer" /> */}

      <Container className="flex items-center justify-center w-full">
        {/* Logo Image */}
        <div className="flex justify-between items-center relative w-full">
          <Image
            src="/logo/dormlogo.png"
            alt="Dorm Bites Hub Logo"
            width={50}
            height={50}
            className="w-16 h-16 rounded-full  object-cover"
          />
          <span className="absolute left-13 text-xl italic font-bold text-gray-color">
            ormBites Hub
          </span>
        </div>
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
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="cursor-pointer">Pages</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                {landings.map((page) => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <div className="flex items-center pl-16 gap-8">
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
          </Link>
          {/* <Button className="hidden md:block ml-2 mr-2">Get Started</Button> */}

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
                  <a href="/home">Home</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/recipes">Recipes</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/about">About</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/contact">Contact</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Login
                  </Button>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Button className="w-full text-sm">Get Started</Button>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* <ThemeToggle /> */}
          <ModeToggle />
        </div>
      </Container>
    </Card>
  );
};

const landings = [
  {
    id: nanoid(),
    title: "Landing 01",
    route: "/project-management",
  },
  {
    id: nanoid(),
    title: "Landing 02",
    route: "/crm-landing",
  },
  {
    id: nanoid(),
    title: "Landing 03",
    route: "/ai-content-landing",
  },
  {
    id: nanoid(),
    title: "Landing 04",
    route: "/new-intro-landing",
  },
  {
    id: nanoid(),
    title: "Landing 05",
    route: "/about-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 06",
    route: "/contact-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 07",
    route: "/faqs-landing",
  },
  {
    id: nanoid(),
    title: "Landing 08",
    route: "/pricing-landing",
  },
  {
    id: nanoid(),
    title: "Landing 09",
    route: "/career-landing",
  },
];

export default Navbar;
