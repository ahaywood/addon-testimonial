"use server";

import { db } from "@/app/addons/testimonials/db/db";

export const createTestimonial = async (formData: FormData) => {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const avatar = formData.get("avatar") as string;
  const rating = formData.get("rating") as string;
  const sourceId = formData.get("sourceId") as string;
  const url = formData.get("sourceUrl") as string;
  const content = formData.get("content") as string;
  const statusId = formData.get("statusId") as string;
  const featured = formData.has("featured") as boolean;
  const date = (formData.get("date") as string) || new Date();
  const tags = formData.get("tags") as string;

  console.log({ tags });

  try {
    // format tags
    const formattedTags = (tags || "").split(",").map((tag) => tag.trim());
    console.log({ formattedTags });

    const testimonialId = crypto.randomUUID();

    await db
      .insertInto("testimonials")
      .values({
        id: testimonialId,
        avatar,
        fullName,
        email,
        company,
        jobTitle,
        rating: parseInt(rating),
        sourceId: parseInt(sourceId),
        url,
        content,
        statusId: parseInt(statusId),
        featured,
        date: new Date(date).toISOString(),
        // todo(justinvdm, 2025-07-17): Values with default values should not need to be set
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .execute();

    await db
      .insertInto("testimonial_taggings")
      .values(
        formattedTags.map((tag: string) => ({
          testimonialId,
          tagId: parseInt(tag),
        }))
      )
      .execute();
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }

  return { success: true, error: null };
};
