import { ArrowRight, Search } from "lucide-react";
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
import { db } from "@/db";
import { NoTestimonials } from "../../components/NoTestimonials";
import { SearchForm } from "../../components/SearchForm";

const DashboardPage = async () => {
  // get all testimonials
  const testimonials = await db.testimonial.findMany({
    include: {
      status: true,
      tags: {
        include: {
          tag: true,
        },
      },
      source: true,
    },
  });

  const approvedTestimonials = testimonials.filter(
    (testimonial) => testimonial.status.name === "Approved"
  );

  const pendingTestimonials = testimonials.filter(
    (testimonial) => testimonial.status.name === "Pending"
  );

  const rejectedTestimonials = testimonials.filter(
    (testimonial) => testimonial.status.name === "Rejected"
  );

  return (
    <>
      <PageHeader
        className="mb-10"
        title="Dashboard"
        description="Monitor and manage testimonials"
      >
        <SearchForm />
      </PageHeader>

      {/* stat blocks */}
      <div className="flex gap-5 mb-6">
        <StatBlock
          label="Total Testimonials"
          number={testimonials.length.toString()}
          percentage="0%"
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
            {testimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="grid gap-y-3 relative">
            {/* filter testimonials to only show pending testimonials */}
            {pendingTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              pendingTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="approved">
          <div className="grid gap-y-3 relative">
            {/* filter testimonials to only show approved testimonials */}
            {approvedTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              approvedTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="grid gap-y-3 relative">
            {rejectedTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              rejectedTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
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
