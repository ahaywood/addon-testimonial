import { env } from "cloudflare:workers";

import debug from "rwsdk/debug";
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

export const db = createDb<TestimonialsDatabase>(
  env.TESTIMONIALS_DURABLE_OBJECT,
  "testimonials-main"
);

export async function getAllTestimonials() {
  return await db.selectFrom("testimonials").selectAll().execute();
}
