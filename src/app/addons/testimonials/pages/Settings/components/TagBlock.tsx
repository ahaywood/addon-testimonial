"use client";

import { Button } from "@/app/components/ui/button";
import { Ellipsis, Eye, Pencil, Trash, Tag as TagIcon } from "lucide-react";
import { Swatch } from "../../../components/Swatch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

const TagBlock = () => {
  return (
    <div className="box p-5 flex items-center gap-x-4">
      <div className="flex-1 flex items-center gap-x-4">
        <Swatch />
        <h3 className="text-lg font-bold">Tag Block</h3>
      </div>
      <div className="button-group">
        <Button variant="ghost">
          <TagIcon />
          15
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a href="#">
                <Eye />
                View
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="text-destructive" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export { TagBlock };
