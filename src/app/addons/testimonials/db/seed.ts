import { db } from "./db";

export const seedTestimonials = async () => {
  // clean out the database
  await db.deleteFrom("testimonials").execute();
  await db.deleteFrom("testimonial_settings").execute();
  await db.deleteFrom("testimonial_sources").execute();
  await db.deleteFrom("testimonial_stats").execute();
  await db.deleteFrom("testimonial_statuses").execute();
  await db.deleteFrom("testimonial_tags").execute();
  await db.deleteFrom("testimonial_taggings").execute();
  await db.deleteFrom("users").execute();

  // set the initial sources
  await db
    .insertInto("testimonial_sources")
    .values([
      { id: 1, name: "Website" },
      { id: 2, name: "Email" },
      { id: 3, name: "YouTube" },
      { id: 4, name: "Discord" },
      { id: 5, name: "Twitter/X" },
      { id: 6, name: "BlueSky" },
      { id: 7, name: "Instagram" },
      { id: 8, name: "LinkedIn" },
      { id: 9, name: "TikTok" },
      { id: 10, name: "Reddit" },
    ])
    .execute();

  // set the testimonial status
  await db
    .insertInto("testimonial_statuses")
    .values([
      { id: 1, name: "Approved" },
      { id: 2, name: "Rejected" },
      { id: 3, name: "Pending" },
    ])
    .execute();

  // create some basic tags
  await db
    .insertInto("testimonial_tags")
    .values([
      { id: 1, name: "Community", color: "#e47947", textColor: "#fff" },
      { id: 2, name: "Docs", color: "#f9c80c", textColor: "#000" },
      { id: 3, name: "DX", color: "#8d51ff", textColor: "#fff" },
    ])
    .execute();

  console.log("🌱 Finished seeding");
};
