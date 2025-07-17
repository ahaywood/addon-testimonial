import { type TestimonialsDatabase } from "./db/db";
import { migrations as testimonialsMigrations } from "./db/migrations";
import { SqliteDurableObject } from "rwsdk/db";

export class TestimonialsDurableObject extends SqliteDurableObject<TestimonialsDatabase> {
  migrations = testimonialsMigrations;
}
