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
  Clock,
  Ellipsis,
  ExternalLink,
  Pencil,
  Star,
  Trash,
  Twitter,
  X,
} from "lucide-react";
import { Prisma } from "@generated/prisma";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteTestimonial,
  updateFeaturedStatus,
  updateStatus,
} from "../lib/actions/Testimonials";
import { TESTIMONIAL_STATUS } from "../lib/helpers/testimonialStatus";
import { getSourceIcon } from "../lib/helpers/getSourceIcon";
import { namedLink } from "../../admin/namedLinks";
import { getAllTestimonials } from "../db";

type TestimonialType = Awaited<ReturnType<typeof getAllTestimonials>>[number];

const Testimonial = ({ testimonial }: { testimonial: TestimonialType }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteTestimonial(testimonial.id);

    if (result.success) {
      toast.success("Testimonial deleted successfully");
    } else {
      toast.error("Failed to delete testimonial");
    }

    setIsDropdownOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleStatus = async (status: number) => {
    const result = await updateStatus(testimonial.id, status);

    if (result.success) {
      toast.success("Testimonial approved successfully");
    } else {
      toast.error("Failed to approve testimonial");
    }
  };

  const handleFeature = async (status: boolean) => {
    const result = await updateFeaturedStatus(testimonial.id, status);

    if (result.success) {
      toast.success("Testimonial featured successfully");
    } else {
      toast.error("Failed to feature testimonial");
    }
  };

  return (
    <>
      <div className="box p-7 relative">
        <div className="absolute top-2 right-2 flex items-center gap-x-2">
          {testimonial?.url && (
            <Button variant="ghost" asChild>
              <a href={testimonial.url} target="_blank">
                <ExternalLink /> Original
              </a>
            </Button>
          )}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {testimonial.status?.name !== "Pending" && (
                <DropdownMenuItem
                  onClick={() => handleStatus(TESTIMONIAL_STATUS.PENDING)}
                >
                  <Clock /> Pending
                </DropdownMenuItem>
              )}
              {testimonial.status?.name !== "Approved" && (
                <DropdownMenuItem
                  onClick={() => handleStatus(TESTIMONIAL_STATUS.APPROVED)}
                >
                  <Check /> Approve
                </DropdownMenuItem>
              )}
              {testimonial.status?.name !== "Rejected" && (
                <DropdownMenuItem
                  onClick={() => handleStatus(TESTIMONIAL_STATUS.REJECTED)}
                >
                  <X /> Reject
                </DropdownMenuItem>
              )}
              {testimonial.featured ? (
                <DropdownMenuItem onClick={() => handleFeature(false)}>
                  <Star /> Unfeature
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => handleFeature(true)}>
                  <Star /> Feature
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <a href={namedLink("edit", { id: testimonial.id })}>
                  <Pencil /> Edit
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Dialog
                  open={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-destructive w-full justify-start"
                    >
                      <Trash /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-destructive">
                      Are you sure you want to delete this testimonial?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        variant="secondary"
                        role="secondary"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsDeleteModalOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete()}
                      >
                        <Trash />
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-x-4 mb-4">
          <div>
            <Avatar className="size-[72px]">
              <AvatarImage src={testimonial.avatar || ""} />
              <AvatarFallback>{testimonial.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2">{testimonial.fullName}</h2>

            <p className="text-muted-foreground text-sm">
              {testimonial.company}{" "}
              {testimonial.company && testimonial.jobTitle && (
                <>
                  <span className="text-muted-foreground">&bull;</span>{" "}
                  {testimonial.jobTitle}
                </>
              )}
            </p>
          </div>
        </div>

        <p className="mb-4">{testimonial.content}</p>

        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-x-2">
            <Calendar size={16} />
            {new Date(testimonial.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          {/* tags */}
          <div className="flex items-center gap-x-2">
            {testimonial.tags.map((tagging) => (
              <Badge
                key={tagging.id}
                style={{
                  backgroundColor: tagging.color || "var(--color-gray-200)",
                  color: tagging.textColor || "var(--color-gray-800)",
                }}
              >
                {tagging.name}
              </Badge>
            ))}

            {testimonial.source?.name &&
              (() => {
                const IconComponent = getSourceIcon(testimonial.source.name);
                return (
                  <Badge>
                    <IconComponent size={16} />
                    {testimonial.source.name}
                  </Badge>
                );
              })()}

            {testimonial.featured && (
              <Badge className="bg-violet-500 text-white">
                <Star className="fill-background" />
                Featured
              </Badge>
            )}

            {testimonial.status?.name === "Approved" && (
              <Badge className="bg-green-600 text-white">
                <Check /> Approved
              </Badge>
            )}

            {testimonial.status?.name === "Pending" && (
              <Badge className="bg-mikdado-yellow text-black">
                <Clock /> Pending
              </Badge>
            )}

            {testimonial.status?.name === "Rejected" && (
              <Badge className="bg-amaranth text-white">
                <X /> Rejected
              </Badge>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Testimonial };
