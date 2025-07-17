import { env } from "cloudflare:workers";

import debug from "rwsdk/debug";
import { Kysely, Selectable, sql } from "kysely";
import { jsonObjectFrom, jsonArrayFrom } from "kysely/helpers/sqlite";
import { type Database, createDb } from "rwsdk/db";
import { migrations } from "./migrations";

const log = debug("testimonials:db");

export type TestimonialsDatabase = Database<typeof migrations>;

export type Testimonial = TestimonialsDatabase["testimonials"];
export type TestimonialSetting = TestimonialsDatabase["testimonial_settings"];
export type TestimonialSource = TestimonialsDatabase["testimonial_sources"];
export type TestimonialStatus = TestimonialsDatabase["testimonial_statuses"];
export type TestimonialTag = TestimonialsDatabase["testimonial_tags"];
export type TestimonialTagging = TestimonialsDatabase["testimonial_taggings"];
export type User = TestimonialsDatabase["users"];

export type FullTestimonial = Awaited<
  ReturnType<typeof getAllTestimonials>
>[number];

export const db = createDb<TestimonialsDatabase>(
  env.TESTIMONIALS_DURABLE_OBJECT,
  "testimonials-database"
);

export async function getAllTestimonials() {
  const testimonials = await db
    .selectFrom("testimonials")
    .selectAll("testimonials")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("testimonial_statuses")
          .selectAll()
          .whereRef("testimonial_statuses.id", "=", "testimonials.statusId")
      ).as("status"),
      jsonObjectFrom(
        eb
          .selectFrom("testimonial_sources")
          .selectAll()
          .whereRef("testimonial_sources.id", "=", "testimonials.sourceId")
      ).as("source"),
      jsonArrayFrom(
        eb
          .selectFrom("testimonial_taggings")
          .innerJoin(
            "testimonial_tags",
            "testimonial_tags.id",
            "testimonial_taggings.tagId"
          )
          .select([
            "testimonial_tags.id",
            "testimonial_tags.name",
            "testimonial_tags.color",
            "testimonial_tags.textColor",
          ])
          .whereRef(
            "testimonial_taggings.testimonialId",
            "=",
            "testimonials.id"
          )
      ).as("tags"),
    ])
    .execute();

  return testimonials;
}
