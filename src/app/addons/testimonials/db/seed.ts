import { defineScript } from "rwsdk/worker";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";

export default defineScript(async () => {
  await setupDb(env);

  // clean out the database
  await db.$executeRawUnsafe(`\
    DELETE FROM TestimonialAccount;
    DELETE FROM TestimonialSource;
    DELETE FROM TestimonialStatus;
    DELETE FROM TestimonialTag;
    DELETE FROM Testimonial;
    DELETE FROM TestimonialTagging;
    DELETE FROM sqlite_sequence;
  `);

  // set the initial sources
  await db.testimonialSource.createMany({
    data: [
      { name: "Website" },
      { name: "Email" },
      { name: "YouTube" },
      { name: "Discord" },
      { name: "Twitter/X" },
      { name: "BlueSky" },
      { name: "Instagram" },
      { name: "LinkedIn" },
      { name: "TikTok" },
      { name: "Reddit" },
    ],
  });

  // set the testimonial status
  await db.testimonialStatus.createMany({
    data: [
      { id: 1, name: "Approved" },
      { id: 2, name: "Rejected" },
      { id: 3, name: "Pending" },
    ],
  });

  // create some basic tags
  await db.testimonialTag.createMany({
    data: [
      { id: 1, name: "Community", color: "#e47947", textColor: "#fff" },
      { id: 2, name: "Docs", color: "#f9c80c", textColor: "#000" },
      { id: 3, name: "DX", color: "#8d51ff", textColor: "#fff" },
    ],
  });

  console.log("🌱 Finished seeding");
});
