"use client";

import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { Filter, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocalStorageState } from "../lib/hooks/useLocalStorageState";

const FilterBar = () => {
  const [isOpen, setIsOpen] = useLocalStorageState("filterBar-isOpen", false);

  return (
    <div
      className={`flex justify-between items-center gap-2
      ${isOpen ? "w-full" : ""}
    `}
    >
      <Button
        variant="ghost"
        role="button"
        className="font-bold uppercase tracking-wider text-sm font-mono flex items-center gap-2 mr-3 absolute right-0 -top-10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prevValue) => !prevValue);
        }}
      >
        <Filter className="size-4" /> FILTER
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap gap-5 bg-zinc-50 dark:bg-zinc-900 rounded-md relative mb-7 p-5 w-full">
              <Button
                className="hover:bg-violet-500 hover:text-white absolute right-1 top-1"
                variant="ghost"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <X />
              </Button>

              <div className="flex items-center gap-2">
                <div className="filter-label">Status</div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <div className="filter-label">Tags</div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="help">Help</SelectItem>
                    <SelectItem value="hub">Hub</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <div className="filter-label">Source</div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { FilterBar };
