"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Calendar,
  Check,
  Ellipsis,
  ExternalLink,
  Pencil,
  Star,
  Trash,
  Twitter,
  X,
} from "lucide-react";

const Testimonial = () => {
  return (
    <div className="box p-7 relative">
      <div className="absolute top-2 right-2 flex items-center gap-x-2">
        <Button variant="ghost">
          <ExternalLink /> Original
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Check /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X /> Reject
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star /> Feature
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-x-4 mb-4">
        <div>
          <Avatar className="size-[72px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-2">Sarah Johnson</h2>

          <p className="text-muted-foreground text-sm">
            RedwoodJS <span className="text-muted-foreground">&bull;</span> Lead
            Maintainer on the Core Team
          </p>
        </div>
      </div>

      <p className="mb-4">
        Sit ad mollit aliqua nostrud proident occaecat dolore. Nulla irure et
        tempor culpa consectetur exercitation cupidatat dolore commodo
        consectetur sit in. Laboris enim cupidatat nulla eiusmod tempor aute
        voluptate eiusmod tempor commodo velit sint tempor cillum. Ullamco
        officia in do culpa mollit esse culpa exercitation culpa. Nostrud esse
        ad est esse in. Proident Lorem nisi velit incididunt aliqua est est
        minim ea. Cupidatat cupidatat fugiat consequat mollit enim.
      </p>

      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <div className="flex items-center gap-x-2">
          <Calendar size={16} />
          June 11, 2025
        </div>

        <div className="flex items-center gap-x-2">
          <Badge>Community</Badge>
          <Badge>DX</Badge>

          <Badge>
            <Twitter />
            Twitter
          </Badge>

          <Badge>
            <Star className="fill-background" />
            Featured
          </Badge>

          <Badge>
            <Check />
            Approved
          </Badge>
        </div>
      </div>
    </div>
  );
};

export { Testimonial };
