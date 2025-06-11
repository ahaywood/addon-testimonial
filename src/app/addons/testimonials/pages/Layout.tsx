import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { LayoutProps } from "rwsdk/router";
import { ThemeSwitcher } from "@/app/addons/themeSwitcher/ThemeSwitcher";
import { Toaster } from "@/app/addons/testimonials/components/Toaster";
import { namedLink } from "@/app/addons/admin/namedLinks";

export const Layout = ({ children, requestInfo }: LayoutProps) => {
  return (
    <main className="p-[100px]">
      <Toaster />
      <div className="absolute top-4 right-4 flex items-center gap-x-6">
        <ThemeSwitcher />
        <Button variant="default" asChild>
          <a href={namedLink("new")}>
            <Plus />
            Testimonial
          </a>
        </Button>
      </div>
      {children}
    </main>
  );
};
