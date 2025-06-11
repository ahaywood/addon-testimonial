"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocalStorageState } from "../../../lib/hooks/useLocalStorageState";

const ManageNotifications = () => {
  const [isOpen, setIsOpen] = useLocalStorageState(
    "manageNotifications-isOpen",
    true
  );

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
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input id="notification-email" />
            </div>

            <Separator className="my-7" />

            <h3 className="text-lg font-bold mb-5">Preferences</h3>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[1fr_auto] gap-7">
                {/* new notification submitted */}
                <div>
                  <Label htmlFor="new-ideas-submitted">New Notification</Label>
                  <p className="section-description">
                    Get notified when users submit new feedback ideas
                  </p>
                </div>
                <Switch id="new-ideas-submitted" defaultChecked={true} />

                {/* weekly digest */}
                <div>
                  <Label htmlFor="weekly-digest">Weekly Digest</Label>
                  <p className="section-description">
                    Receive a weekly summary of all testimonials
                  </p>
                </div>

                <Switch id="weekly-digest" defaultChecked={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { ManageNotifications };
