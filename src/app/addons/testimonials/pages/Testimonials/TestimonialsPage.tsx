import { FilterBar } from "../../components/FilterBar";
import { Testimonial } from "../../components/Testimonial";
import { SearchForm } from "../../components/SearchForm";
import { PageHeader } from "../../components/PageHeader";
import { NoTestimonials } from "../../components/NoTestimonials";
import { getAllTestimonials } from "../../db/db";

const TestimonialsPage = async () => {
  // get all testimonials
  // const testimonials = await db.testimonial.findMany({
  //   include: {
  //     status: true,
  //     tags: {
  //       include: {
  //         tag: true,
  //       },
  //     },
  //     source: true,
  //   },
  // });
  // const testimonials = await getAllTestimonials();
  // console.log({ testimonials });

  return (
    <div>
      <PageHeader
        className="mb-12"
        title="All Testimonials"
        description="Manage all the testimonials."
      >
        <SearchForm />
      </PageHeader>

      <div className="grid gap-y-3 relative">
        <FilterBar />

        {/* {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} testimonial={testimonial} />
          ))
        ) : (
          <NoTestimonials />
        )} */}
      </div>
    </div>
  );
};

export { TestimonialsPage };
