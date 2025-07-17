import { type Migrations } from "rwsdk/db";

export const migrations = {
  "001_initial_schema": {
    async up(db) {
      const schema = [
        await db.schema
          .createTable("testimonials")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("fullName", "text", (col) => col.notNull())
          .addColumn("email", "text")
          .addColumn("company", "text")
          .addColumn("jobTitle", "text")
          .addColumn("avatar", "text")
          .addColumn("rating", "integer")
          .addColumn("content", "text", (col) => col.notNull())
          .addColumn("date", "text", (col) => col.notNull())
          .addColumn("featured", "boolean", (col) =>
            col.notNull().defaultTo(false)
          )
          .addColumn("url", "text")
          .addColumn("sourceId", "integer", (col) =>
            col.notNull().references("testimonial_sources.id")
          )
          .addColumn("statusId", "integer", (col) =>
            col.notNull().references("testimonial_statuses.id")
          )
          .addColumn("createdAt", "text", (col) => col.notNull())
          .addColumn("updatedAt", "text", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("testimonial_settings")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("notificationEmail", "text")
          .addColumn("notifyNewTestimonials", "boolean", (col) =>
            col.notNull().defaultTo(false)
          )
          .addColumn("notifyWeeklyDigest", "boolean", (col) =>
            col.notNull().defaultTo(false)
          )
          .addColumn("userId", "text", (col) =>
            col.notNull().references("users.id").onDelete("cascade")
          )
          .addColumn("createdAt", "text", (col) => col.notNull())
          .addColumn("updatedAt", "text", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("testimonial_sources")
          .addColumn("id", "integer", (col) => col.primaryKey())
          .addColumn("name", "text", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("testimonial_stats")
          .addColumn("id", "integer", (col) => col.primaryKey())
          .addColumn("totalTestimonials", "integer", (col) =>
            col.notNull().defaultTo(0)
          )
          .execute(),

        await db.schema
          .createTable("testimonial_statuses")
          .addColumn("id", "integer", (col) => col.primaryKey())
          .addColumn("name", "text", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("testimonial_tags")
          .addColumn("id", "integer", (col) => col.primaryKey())
          .addColumn("name", "text", (col) => col.notNull())
          .addColumn("color", "text", (col) => col.notNull())
          .addColumn("textColor", "text", (col) => col.notNull())
          .execute(),

        await db.schema
          .createTable("testimonial_taggings")
          .addColumn("testimonialId", "text", (col) =>
            col.notNull().references("testimonials.id")
          )
          .addColumn("tagId", "integer", (col) =>
            col.notNull().references("testimonial_tags.id")
          )
          .addUniqueConstraint("testimonial_tag_unique", [
            "testimonialId",
            "tagId",
          ])
          .execute(),

        await db.schema
          .createTable("users")
          .addColumn("id", "text", (col) => col.primaryKey())
          .addColumn("createdAt", "text", (col) => col.notNull())
          .addColumn("updatedAt", "text", (col) => col.notNull())
          .execute(),
      ];

      return schema;
    },

    async down(db) {
      console.log("################## testimonials migrations down");
      await db.schema.dropTable("testimonials").execute();
      await db.schema.dropTable("testimonial_settings").execute();
      await db.schema.dropTable("testimonial_sources").execute();
      await db.schema.dropTable("testimonial_stats").execute();
      await db.schema.dropTable("testimonial_statuses").execute();
      await db.schema.dropTable("testimonial_tags").execute();
      await db.schema.dropTable("testimonial_taggings").execute();
      await db.schema.dropTable("users").execute();
    },
  },
  //"002_test": {
  //  async up(db) {
  //    console.log("################## testimonials migrations up 002");
  //    const r = [
  //      await db.schema
  //        .createTable("sometable")
  //        .addColumn("id", "text", (col) => col.primaryKey())
  //        .execute(),
  //    ];
  //    throw new Error("test error");
  //    return r;
  //  },
  //  async down(db) {
  //    console.log("################## testimonials migrations down 002");
  //    return [await db.schema.dropTable("sometable").execute()];
  //  },
  //},
} satisfies Migrations;
