"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { MultiSelectCombobox } from "../../../components/MultiSelectCombobox";
import { DatePicker } from "../../../components/DatePicker";
import { Button } from "@/app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { Check, Clock, X } from "lucide-react";
import { Rating } from "../../../components/Rating";
import { TestimonialSource, TestimonialTag } from "@generated/prisma";
import { createTestimonial } from "../actions";
import { toast } from "sonner";
import { useState } from "react";
import { namedLink } from "@/app/addons/admin/namedLinks";
import { TESTIMONIAL_STATUS } from "../../../lib/helpers/testimonialStatus";

const NewTestimonialForm = ({
  allSources,
  allTags,
}: {
  allSources: TestimonialSource[];
  allTags: TestimonialTag[];
}) => {
  const [status, setStatus] = useState<string>("3");

  const handleSubmit = async (formData: FormData) => {
    formData.append("statusId", status);
    const result = await createTestimonial(formData);
    if (result.success) {
      window.location.href = namedLink("testimonials");
    } else {
      toast.error("Failed to create testimonial");
    }
  };

  return (
    <form
      className="grid grid-cols-[1fr_350px] gap-x-[100px]"
      action={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="box p-7 grid grid-cols-2 gap-y-5 gap-x-10">
        <h2 className="section-title col-span-2">CUSTOMER INFORMATION</h2>
        <div className="field">
          <Label>
            Full Name<span className="text-required">*</span>
          </Label>
          <Input type="text" name="fullName" required />
        </div>
        <div className="field">
          <Label>Email</Label>
          <Input type="email" name="email" />
        </div>
        <div className="field">
          <Label>Company</Label>
          <Input type="text" name="company" />
        </div>
        <div className="field">
          <Label>Job Title</Label>
          <Input type="text" name="jobTitle" />
        </div>
        <div className="field col-span-2 flex gap-5">
          <div>
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <Label>Profile Image</Label>
            <Input type="file" className="w-full" name="avatar" />
          </div>
        </div>
        <div className="col-span-2">
          <Separator className="mb-7" />
          <h2 className="section-title">Testimonial</h2>
        </div>
        <div className="field">
          <Label>Rating</Label>
          <Rating name="rating" />
        </div>
        <div className="field">
          {allSources.length > 0 && (
            <>
              <Label>Source</Label>
              <Select name="sourceId">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a source" />
                </SelectTrigger>
                <SelectContent>
                  {allSources.map((source) => (
                    <SelectItem key={source.id} value={source.id.toString()}>
                      {source.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className="field col-span-2">
          <Label>Source URL</Label>
          <Input type="url" name="url" />
        </div>

        <div className="field col-span-2">
          <Label>
            Testimonial<span className="text-required">*</span>
          </Label>
          <Textarea className="h-[100px]" name="content" required />
        </div>

        <div className="field col-span-2 flex justify-end gap-2">
          <Button variant="secondary" type="button">
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Save
          </Button>
        </div>
      </div>

      <aside>
        <section>
          <ToggleGroup
            type="single"
            variant="outline"
            className="w-full"
            defaultValue="3"
            onValueChange={(value) => {
              setStatus(value);
            }}
          >
            <ToggleGroupItem
              value={TESTIMONIAL_STATUS.PENDING.toString()}
              className="hover:bg-mikdado-yellow-light hover:text-mikdado-yellow-dark h-12 data-[state=on]:bg-mikdado-yellow"
            >
              <Clock />
              Pending
            </ToggleGroupItem>
            <ToggleGroupItem
              value={TESTIMONIAL_STATUS.APPROVED.toString()}
              className="hover:bg-fern-light hover:text-fern-dark h-12 data-[state=on]:bg-fern data-[state=on]:text-white"
            >
              <Check />
              Approved
            </ToggleGroupItem>
            <ToggleGroupItem
              value={TESTIMONIAL_STATUS.REJECTED.toString()}
              className="hover:bg-amaranth-light hover:text-amaranth-dark h-12 data-[state=on]:bg-amaranth data-[state=on]:text-white"
            >
              <X />
              Rejected
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="flex items-center gap-2 mt-5">
            <Label className="!mb-0">
              <Switch name="featured" /> Featured Testimonial
            </Label>
          </div>
        </section>

        <Separator className="separator !my-6" />

        <section>
          <DatePicker label="Date Received" name="date" />
        </section>

        <Separator className="separator !mt-6 mb-4" />

        <section>
          <MultiSelectCombobox
            name="tags"
            label="Tags"
            placeholder="Select a tag"
            notFoundMessage="No tag found"
            emptyMessage="No Tag"
            data={allTags.map((tag) => ({
              value: tag.id.toString(),
              label: tag.name,
              color: tag.color ?? undefined,
              textColor: tag.textColor ?? undefined,
            }))}
          />
        </section>

        <Separator className="separator !my-6" />
      </aside>
    </form>
  );
};

export { NewTestimonialForm };
