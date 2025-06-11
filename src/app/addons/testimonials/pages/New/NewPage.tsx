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
import { MultiSelectCombobox } from "../../components/MultiSelectCombobox";
import { Textarea } from "@/app/components/ui/textarea";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "@/app/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { Check, Clock, X } from "lucide-react";
import { Rating } from "../../components/Rating";

const NewPage = () => {
  return (
    <div>
      <h1 className="page-title">New Testimonial</h1>
      <p className="page-description mb-10">
        Add a new testimonial to the database.
      </p>
      <form className="grid grid-cols-[1fr_350px] gap-x-[100px]">
        <div className="box p-7 grid grid-cols-2 gap-y-5 gap-x-10">
          <h2 className="section-title col-span-2">CUSTOMER INFORMATION</h2>
          <div className="field">
            <Label>Full Name</Label>
            <Input type="text" />
          </div>
          <div className="field">
            <Label>Email</Label>
            <Input type="email" />
          </div>
          <div className="field">
            <Label>Company</Label>
            <Input type="text" />
          </div>
          <div className="field">
            <Label>Job Title</Label>
            <Input type="text" />
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
              <Input type="file" className="w-full" />
            </div>
          </div>
          <div className="col-span-2">
            <Separator className="mb-7" />
            <h2 className="section-title">Testimonial</h2>
          </div>
          <div className="field">
            <Label>Rating</Label>
            <Rating />
          </div>
          <div className="field">
            <Label>Source</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="bluesky">Bluesky</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="field col-span-2">
            <Label>Source URL</Label>
            <Input type="url" />
          </div>

          <div className="field col-span-2">
            <Label>Testimonial</Label>
            <Textarea className="h-[100px]" />
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
            <ToggleGroup type="single" variant="outline" className="w-full">
              <ToggleGroupItem
                value="a"
                className="hover:bg-blue-100 hover:text-blue-900 h-12 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                <Clock />
                Pending
              </ToggleGroupItem>
              <ToggleGroupItem
                value="b"
                className="hover:bg-green-100 hover:text-green-900 h-12 data-[state=on]:bg-green-600 data-[state=on]:text-white"
              >
                <Check />
                Approved
              </ToggleGroupItem>
              <ToggleGroupItem
                value="c"
                className="hover:bg-red-100 hover:text-red-900 h-12 data-[state=on]:bg-red-600 data-[state=on]:text-white"
              >
                <X />
                Rejected
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="flex items-center gap-2 mt-5">
              <Switch /> <Label className="!mb-0">Featured Testimonial</Label>
            </div>
          </section>

          <Separator className="separator !my-6" />

          <section>
            <DatePicker label="Date Received" name="date_received" />
          </section>

          <Separator className="separator !mt-6 mb-4" />

          <section>
            <MultiSelectCombobox
              label="Tags"
              placeholder="Select a tag"
              notFoundMessage="No tag found"
              emptyMessage="No Tag"
              data={[
                {
                  value: "hero",
                  label: "Hero",
                },
                {
                  value: "helper",
                  label: "Helper",
                },
              ]}
            />
          </section>

          <Separator className="separator !my-6" />
        </aside>
      </form>
    </div>
  );
};

export { NewPage };
