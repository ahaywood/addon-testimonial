"use server";

import { db } from "@/db";

export const deleteTestimonial = async (id: string) => {
  try {
    await db.testimonial.delete({
      where: { id },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const updateStatus = async (id: string, status: number) => {
  try {
    await db.testimonial.update({
      where: { id },
      data: {
        statusId: status,
      },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const updateFeaturedStatus = async (id: string, featured: boolean) => {
  const updateData: any = { featured };
  // if the testimonial is being featured, set the status to approved
  // otherwise, don't change the status
  if (featured) {
    updateData.statusId = 1;
  }

  try {
    await db.testimonial.update({
      where: { id },
      data: updateData,
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};
