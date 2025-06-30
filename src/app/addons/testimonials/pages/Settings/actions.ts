"use server";

import { db } from "@/db";

export const updateNotificationEmail = async (
  userId: string,
  email: string
) => {
  try {
    await db.testimonialAccount.upsert({
      where: {
        userId,
      },
      update: {
        notificationEmail: email,
      },
      create: {
        userId,
        notificationEmail: email,
      },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const updateNewTestimonialNotifications = async (
  userId: string,
  checked: boolean
) => {
  try {
    await db.testimonialAccount.upsert({
      where: {
        userId,
      },
      update: {
        notifyNewTestimonials: checked,
      },
      create: {
        userId,
        notifyNewTestimonials: checked,
      },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const updateWeeklyDigestNotifications = async (
  userId: string,
  checked: boolean
) => {
  try {
    await db.testimonialAccount.upsert({
      where: {
        userId,
      },
      update: {
        notifyWeeklyDigest: checked,
      },
      create: {
        userId,
        notifyWeeklyDigest: checked,
      },
    });
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};
