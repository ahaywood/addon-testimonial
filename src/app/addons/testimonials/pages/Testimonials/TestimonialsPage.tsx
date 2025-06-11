import { FilterBar } from "../../components/FilterBar";
import { Testimonial } from "../../components/Testimonial";

const TestimonialsPage = () => {
  return (
    <div>
      <h1 className="page-title">All Testimonials</h1>
      <p className="page-description mb-10">Manage all the testimonials.</p>

      <div className="grid gap-y-3 relative">
        <FilterBar />
        <Testimonial />
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
    </div>
  );
};

export { TestimonialsPage };
