import { RequestInfo } from "rwsdk/worker";
import { BackButton } from "../../components/BackButton";
import { ManageNotifications } from "./components/ManageNotifications";
import { ManageTags } from "./components/ManageTags";
import { db } from "@/db";
import { Prisma } from "@generated/prisma";

export type TestimonialTagType = Prisma.TestimonialTagGetPayload<{
  include: {
    _count: {
      select: {
        testimonials: true;
      };
    };
  };
}>;

export const SettingsPage = async ({ ctx }: RequestInfo) => {
  // get all testimonial tags
  const allTags = await db.testimonialTag.findMany({
    include: {
      _count: {
        select: {
          testimonials: true,
        },
      },
    },
  });

  // get the notification settings
  const notificationSettings = await db.testimonialAccount.findMany();
  console.log({ notificationSettings });

  return (
    <div>
      <BackButton />

      <div className="mb-10">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage configurations and settings</p>
      </div>

      <div className="flex flex-col gap-5">
        <ManageTags allTags={allTags} />

        <ManageNotifications
          notificationSettings={notificationSettings[0]}
          userId={ctx.user?.id ?? ""}
        />
      </div>
    </div>
  );
};
