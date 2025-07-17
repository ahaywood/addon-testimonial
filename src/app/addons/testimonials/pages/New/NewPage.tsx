import { PageHeader } from "../../components/PageHeader";
import { NewTestimonialForm } from "./components/NewTestimonialForm";
import { db } from "../../db/db";

const getAllSources = async () => {
  return await db.selectFrom("testimonial_sources").selectAll().execute();
};

export type getAllSourcesType = Awaited<
  ReturnType<typeof getAllSources>
>[number];

const getAllTags = async () => {
  return await db.selectFrom("testimonial_tags").selectAll().execute();
};

export type getAllTagsType = Awaited<ReturnType<typeof getAllTags>>[number];

const NewPage = async () => {
  const allSources = await getAllSources();
  const allTags = await getAllTags();

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
