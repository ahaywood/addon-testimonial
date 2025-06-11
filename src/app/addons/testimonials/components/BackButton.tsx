import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { namedLink } from "@/app/addons/admin/namedLinks";

const BackButton = () => {
  return (
    <Button variant="ghost" className="absolute top-3 left-3" asChild>
      <a href={namedLink("dashboard")}>
        <ArrowLeft />
        Back
      </a>
    </Button>
  );
};

export { BackButton };
