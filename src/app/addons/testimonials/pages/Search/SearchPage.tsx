import { db } from "@/db";
import { FilterBar } from "../../components/FilterBar";
import { Testimonial } from "../../components/Testimonial";
import { AppContext } from "@/worker";
import { Prisma } from "@generated/prisma";
import { NoTestimonials } from "../../components/NoTestimonials";
import { PageHeader } from "../../components/PageHeader";
import { SearchForm } from "../../components/SearchForm";

type TestimonialType = Prisma.TestimonialGetPayload<{
  include: {
    status: true;
    tags: {
      include: {
        tag: true;
      };
    };
    source: true;
  };
}>;

const SearchPage = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const keywords = url.searchParams.get("keywords");

  // get testimonials
  let testimonials: TestimonialType[] = [];
  if (keywords) {
    testimonials = await db.testimonial.findMany({
      where: {
        OR: [
          { fullName: { contains: keywords } },
          { email: { contains: keywords } },
          { company: { contains: keywords } },
          { jobTitle: { contains: keywords } },
          { content: { contains: keywords } },
        ],
      },
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
  }

  console.log(testimonials);

  return (
    <div>
      <PageHeader
        className="mb-12"
        title="Search Testimonials"
        description="Search for testimonials"
      >
        <SearchForm />
      </PageHeader>

      <div className="grid gap-y-3 relative">
        <FilterBar />

        {testimonials.length === 0 ? (
          <NoTestimonials />
        ) : (
          testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))
        )}
      </div>
    </div>
  );
};

export { SearchPage };
