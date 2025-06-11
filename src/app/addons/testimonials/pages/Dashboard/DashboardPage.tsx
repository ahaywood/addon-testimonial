import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { StatBlock } from "../../components/StatBlock";
import { Testimonial } from "../../components/Testimonial";
import { PageHeader } from "../../components/PageHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { namedLink } from "@/app/addons/admin/namedLinks";

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        className="mb-10"
        title="Dashboard"
        description="Monitor and manage community ideas, comments, and user activity across all boards"
      >
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search"
            id="search"
            name="search"
            className="w-[150px] focus:w-[300px] transition-all duration-500"
          />
          <label htmlFor="search" className="cursor-pointer">
            <Search />
          </label>
        </div>
      </PageHeader>

      {/* stat blocks */}
      <div className="flex gap-5 mb-6">
        <StatBlock
          label="Total Ideas"
          number="1,289"
          percentage="+10%"
          description="from last year"
        />
        <StatBlock
          label="Comments"
          number="10"
          percentage="+20%"
          description="within the last week"
          direction="down"
        />
        <StatBlock
          label="Total Votes"
          number="10"
          percentage="10%"
          description="within the last day"
          direction="up"
        />
      </div>

      <Tabs defaultValue="all" className="mb-10">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-y-3 relative">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="grid gap-y-3 relative">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </TabsContent>
        <TabsContent value="approved">
          <div className="grid gap-y-3 relative">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="grid gap-y-3 relative">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </TabsContent>
      </Tabs>

      <Button variant="secondary" asChild>
        <a href={namedLink("testimonials")}>
          All Testimonials <ArrowRight />
        </a>
      </Button>
    </>
  );
};

export { DashboardPage };
