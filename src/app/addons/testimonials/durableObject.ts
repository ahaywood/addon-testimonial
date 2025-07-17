import { type TestimonialsDatabase } from "./db/db";
import { migrations as testimonialsMigrations } from "./db/migrations";
import { SqliteDurableObject } from "rwsdk/db";

console.log("################## testimonials durable object");
export class TestimonialsDurableObject extends SqliteDurableObject<TestimonialsDatabase> {
  migrations = testimonialsMigrations;
}
