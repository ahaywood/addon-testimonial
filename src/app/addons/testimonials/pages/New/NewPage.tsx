import { PageHeader } from "../../components/PageHeader";
import { NewTestimonialForm } from "./components/NewTestimonialForm";
import { getDb } from "../../db/db";

const getAllSources = async () => {
  const db = await getDb();
  return await db.selectFrom("testimonial_sources").selectAll().execute();
};

export type getAllSourcesType = Awaited<ReturnType<typeof getAllSources>>;

const getAllTags = async () => {
  const db = await getDb();
  return await db.selectFrom("testimonial_tags").selectAll().execute();
};

export type getAllTagsType = Awaited<ReturnType<typeof getAllTags>>;

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
