"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-5 sm:right-10 top-5"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="cursor-default max-w-40 p-1 text-sm font-geist"
        align="end"
      >
        <div
          className="hover:bg-accent pl-2 py-1 rounded"
          onClick={() => setTheme("light")}
        >
          Light
        </div>
        <div
          className="hover:bg-accent pl-2 py-1 rounded"
          onClick={() => setTheme("dark")}
        >
          Dark
        </div>
        <div
          className="hover:bg-accent pl-2 py-1 rounded"
          onClick={() => setTheme("system")}
        >
          System
        </div>
      </PopoverContent>
    </Popover>
  );
}
