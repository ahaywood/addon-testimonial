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
// import { db } from "@/db";
import { NoTestimonials } from "../../components/NoTestimonials";
import { SearchForm } from "../../components/SearchForm";
import { getAllTestimonials, getDb } from "../../db/db";

const DashboardPage = async () => {
  // get all testimonials
  const db = await getDb();
  const testimonials = await db
    .selectFrom("testimonials")
    .leftJoin(
      "testimonial_sources",
      "testimonials.sourceId",
      "testimonial_sources.id"
    )
    .leftJoin(
      "testimonial_statuses",
      "testimonials.statusId",
      "testimonial_statuses.id"
    )
    .leftJoin(
      "testimonial_taggings",
      "testimonials.id",
      "testimonial_taggings.testimonialId"
    )
    .leftJoin(
      "testimonial_tags",
      "testimonial_taggings.tagId",
      "testimonial_tags.id"
    )
    .select([
      "testimonials.id",
      "testimonials.fullName",
      "testimonials.email",
      "testimonials.company",
      // "testimonials.jobTitle",
      "testimonials.avatar",
      "testimonials.rating",
      "testimonials.content",
      "testimonials.date",
      // "testimonials.featured",
      "testimonials.url",
      "testimonials.sourceId",
      "testimonial_statuses.name as statusName",
      "testimonials.createdAt",
      "testimonials.updatedAt",
      "testimonial_tags.name as tagName",
      "testimonial_tags.color as tagColor",
      "testimonial_tags.textColor as tagTextColor",
      "testimonial_sources.id as sourceId",
      "testimonial_sources.name as sourceName",
    ])
    .execute();
  console.log({ testimonials });

  const approvedTestimonials = testimonials.filter(
    (testimonial) => testimonial.statusName === "Approved"
  );

  const pendingTestimonials = testimonials.filter(
    (testimonial) => testimonial.statusName === "Pending"
  );

  const rejectedTestimonials = testimonials.filter(
    (testimonial) => testimonial.statusName === "Rejected"
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
        {/* <StatBlock
          label="Total Testimonials"
          number={testimonials.length.toString()}
          percentage="0%"
          description="from last year"
        /> */}
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
          {/* <div className="grid gap-y-3 relative">
            {testimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )}
          </div> */}
        </TabsContent>
        <TabsContent value="pending">
          <div className="grid gap-y-3 relative">
            {/* filter testimonials to only show pending testimonials */}
            {/* {pendingTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              pendingTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )} */}
          </div>
        </TabsContent>
        <TabsContent value="approved">
          <div className="grid gap-y-3 relative">
            {/* filter testimonials to only show approved testimonials */}
            {/* {approvedTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              approvedTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )} */}
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="grid gap-y-3 relative">
            {/* {rejectedTestimonials.length === 0 ? (
              <NoTestimonials />
            ) : (
              rejectedTestimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))
            )} */}
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
