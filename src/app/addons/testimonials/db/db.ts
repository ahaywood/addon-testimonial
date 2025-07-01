import { env } from "cloudflare:workers";

import debug from "rwsdk/debug";
import { type Database, createDb } from "rwsdk/db";
import { migrations } from "./migrations";

const log = debug("passkey:db");

export type TestimonialsDatabase = Database<typeof migrations>;

export type Testimonial = TestimonialsDatabase["testimonials"];
export type TestimonialAccount = TestimonialsDatabase["testimonialAccounts"];
export type TestimonialSource = TestimonialsDatabase["testimonialSources"];
export type TestimonialStatus = TestimonialsDatabase["testimonialStatuses"];
export type TestimonialTag = TestimonialsDatabase["testimonialTags"];
export type TestimonialTagging = TestimonialsDatabase["testimonialTaggings"];
export type User = TestimonialsDatabase["users"];

export const db = createDb<TestimonialsDatabase>(
  env.TESTIMONIALS_DURABLE_OBJECT,
  "testimonials-main"
);
