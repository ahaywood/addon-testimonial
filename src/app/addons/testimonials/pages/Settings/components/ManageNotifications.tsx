"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocalStorageState } from "../../../lib/hooks/useLocalStorageState";
import { TestimonialAccount } from "@generated/prisma";
import { toast } from "sonner";
import {
  updateNewTestimonialNotifications,
  updateNotificationEmail,
  updateWeeklyDigestNotifications,
} from "../actions";

/**
 * I'm using the userId instead of the testimonialAccountId because there's a
 * chance the user doesn't have a testimonialAccount setup.
 *
 * We may need to revisit this structure and set up a testimonialAccount on
 * account creation if there are going ot be more than one testimonial accounts
 * within this application.
 */

const ManageNotifications = ({
  notificationSettings,
  userId,
}: {
  notificationSettings: TestimonialAccount | null;
  userId: string;
}) => {
  const [isOpen, setIsOpen] = useLocalStorageState(
    "manageNotifications-isOpen",
    true
  );

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await updateNotificationEmail(userId, e.target.value);
    if (result.success) {
      toast.success("Notification email updated");
    } else {
      toast.error("Failed to update notification email");
    }
  };

  const handleNewTestimonialsChange = async (checked: boolean) => {
    const result = await updateNewTestimonialNotifications(userId, checked);
    if (result.success) {
      toast.success("Notification email updated");
    } else {
      toast.error("Failed to update notification email");
    }
  };

  const handleWeeklyDigestChange = async (checked: boolean) => {
    const result = await updateWeeklyDigestNotifications(userId, checked);
    if (result.success) {
      toast.success("Notification email updated");
    } else {
      toast.error("Failed to update notification email");
    }
  };

  return (
    <section className="box p-5">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer hover:text-violet-500"
      >
        <h2 className="section-title flex items-center gap-x-1">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} />
          </motion.div>
          Notifications
        </h2>
      </button>
      <p className="section-description">
        Configure which email notifications you want to receive for feedback
        activities.
      </p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-2 pt-5">
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                name="notificationEmail"
                defaultValue={notificationSettings?.notificationEmail ?? ""}
                onBlur={handleEmailChange}
              />
            </div>

            <Separator className="my-7" />

            <h3 className="text-lg font-bold mb-5">Preferences</h3>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] gap-7">
                {/* new notification submitted */}
                <div>
                  <Label htmlFor="new-ideas-submitted">New Testimonials</Label>
                  <p className="section-description">
                    Get notified when new testimonials are submitted.
                  </p>
                </div>
                <Switch
                  id="notifyNewTestimonials"
                  name="notifyNewTestimonials"
                  defaultChecked={notificationSettings?.notifyNewTestimonials}
                  onCheckedChange={(e) => handleNewTestimonialsChange(e)}
                />

                {/* weekly digest */}
                <div>
                  <Label htmlFor="weekly-digest">Weekly Digest</Label>
                  <p className="section-description">
                    Receive a weekly summary of all new testimonials
                  </p>
                </div>

                <Switch
                  id="notifyWeeklyDigest"
                  name="notifyWeeklyDigest"
                  defaultChecked={notificationSettings?.notifyWeeklyDigest}
                  onCheckedChange={(e) => handleWeeklyDigestChange(e)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { ManageNotifications };
