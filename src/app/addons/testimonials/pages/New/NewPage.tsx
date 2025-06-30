import { db } from "@/db";
import { PageHeader } from "../../components/PageHeader";
import { NewTestimonialForm } from "./components/NewTestimonialForm";

const NewPage = async () => {
  // get all testimonial sources
  const allSources = await db.testimonialSource.findMany();

  // get all testimonial tags
  const allTags = await db.testimonialTag.findMany();

  return (
    <div>
      <PageHeader
        title="New Testimonial"
        description="Add a new testimonial to the database."
        className="mb-10"
      />
      <NewTestimonialForm allSources={allSources} allTags={allTags} />
    </div>
  );
};

export { NewPage };
