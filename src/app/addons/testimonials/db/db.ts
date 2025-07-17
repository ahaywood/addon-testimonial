import { env } from "cloudflare:workers";

import debug from "rwsdk/debug";
import { Kysely, Selectable, sql } from "kysely";
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
  const result = await db
    .selectFrom("testimonials")
    .innerJoin(
      "testimonial_statuses",
      "testimonials.statusId",
      "testimonial_statuses.id"
    )
    .innerJoin(
      "testimonial_sources",
      "testimonials.sourceId",
      "testimonial_sources.id"
    )
    .select((eb) => [
      "testimonials.id",
      "testimonials.fullName",
      "testimonials.email",
      "testimonials.company",
      "testimonials.jobTitle",
      "testimonials.featured",
      "testimonials.date",
      "testimonials.avatar",
      "testimonials.url",
      "testimonials.content",
      "testimonials.rating",
      "testimonials.sourceId",
      "testimonials.statusId",
      "testimonials.featured",
      sql<string>`json_object('id', testimonial_statuses.id, 'name', testimonial_statuses.name)`.as(
        "status"
      ),
      sql<string>`json_object('id', testimonial_sources.id, 'name', testimonial_sources.name)`.as(
        "source"
      ),
      sql<string>`(
        SELECT 
          json_group_array(
            json_object(
              'id', testimonial_tags.id, 
              'name', testimonial_tags.name, 
              'color', testimonial_tags.color, 
              'textColor', testimonial_tags.textColor
            )
          ) 
        FROM testimonial_taggings
        JOIN testimonial_tags ON testimonial_taggings.tagId = testimonial_tags.id
        WHERE testimonial_taggings.testimonialId = testimonials.id
      )`.as("tags"),
    ])
    .execute();

  const testimonials = result.map((row) => ({
    ...row,
    status: row.status ? (JSON.parse(row.status) as TestimonialStatus) : null,
    source: row.source ? (JSON.parse(row.source) as TestimonialSource) : null,
    tags: row.tags ? (JSON.parse(row.tags) as TestimonialTag[]) : [],
  }));

  return testimonials;
}
