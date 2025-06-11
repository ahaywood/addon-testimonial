"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system" | "">("");

  useEffect(() => {
    // get the value of local storage
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme as "light" | "dark");
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-6">
        {theme && theme === "system" && <Monitor />}
        {theme && theme === "light" && <Sun />}
        {theme && theme === "dark" && <Moon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            localStorage.theme = "light";
            setTheme("light");
          }}
        >
          <Sun /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            localStorage.theme = "dark";
            setTheme("dark");
          }}
        >
          <Moon /> Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("theme");
            setTheme("system");
          }}
        >
          <Monitor /> System Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
