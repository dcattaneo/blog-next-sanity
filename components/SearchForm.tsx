import Form from "next/form";
import { SearchFormReset } from "./index";
import { SearchIcon } from "lucide-react";
// import { buttonVariants, Button } from "@/components/ui/button";

export const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input "
        placeholder="Search"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn ">
          <SearchIcon className="size-5" />
        </button>
      </div>
    </Form>
  );
};
