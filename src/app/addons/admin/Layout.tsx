import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Ellipsis,
  Home,
  Lightbulb,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  UserCircle,
} from "lucide-react";
import { LayoutProps } from "rwsdk/router";
import { namedLink } from "./namedLinks";

const Layout = ({ children, requestInfo }: LayoutProps) => {
  return (
    <div className="grid grid-cols-[250px_1fr] size-screen fixed inset-0">
      {/* sidebar */}
      <aside className="bg-muted pt-10 border-r-1 border-card h-screen flex flex-col">
        <div className="top-0 sticky px-5">
          <img
            src="/images/logo-light.svg"
            alt="RedwoodSDK"
            className="max-w-[175px] mb-6 visible dark:hidden"
          />
          <img
            src="/images/logo-dark.svg"
            alt="RedwoodSDK"
            className="max-w-[175px] mb-6 hidden dark:block"
          />
        </div>

        <nav className="pl-5 flex-1 overflow-y-auto px-5">
          <ul className="flex flex-col gap-3">
            <li>
              <Button variant="ghost" asChild>
                <a href="#">
                  <Home />
                  Dashboard
                </a>
              </Button>
            </li>

            <li className="w-full justify-between">
              <Button variant="ghost" asChild>
                <a href={namedLink("dashboard")}>
                  <MessageCircle />
                  Testimonials
                </a>
              </Button>

              <ul className="pl-5">
                <li>
                  <Button variant="ghost" asChild>
                    <a href={namedLink("testimonials")}>All Testimonials</a>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <a href={namedLink("settings")}>Settings</a>
                  </Button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="px-5 py-2 sticky bottom-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 w-full h-12"
                variant="ghost"
              >
                <div>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-violet-500">
                      {requestInfo?.ctx?.user?.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="font-bold flex-1 text-left">
                  {requestInfo?.ctx?.user?.username}
                </div>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild>
                <a href="#">
                  <UserCircle />
                  My Account
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#">
                  <Settings />
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={namedLink("logout")}>
                  <LogOut />
                  Logout
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* main content */}
      <main className="h-screen overflow-y-auto relative">{children}</main>
    </div>
  );
};

export { Layout };
