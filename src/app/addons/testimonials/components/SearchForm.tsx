import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import { namedLink } from "../../admin/namedLinks";

const SearchForm = () => {
  return (
    <form action={namedLink("search")} className="flex items-center gap-2">
      <Input
        placeholder="Search"
        id="keywords"
        name="keywords"
        className="w-[150px] focus:w-[300px] transition-all duration-500"
      />
      <Button variant="ghost" type="submit">
        <Search className="size-6 text-muted-foreground" />
      </Button>
    </form>
  );
};

export { SearchForm };
