'use client'
import { SearchIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const Search = <T extends (formdata: FormData) => void>({ search }: { search: T }) => {
  return (
    <form action={search} className="px-5 flex items-center justify-center border-2 border-border rounded-lg bg-background h-10 w-72 group transition-all duration-250 ease-in-out hover:border-secondary-foreground focus-within:border-secondary-foreground focus-within:w-full">
      <label htmlFor="search" className="sr-only">
        Search Perscriptions
      </label>
      <input
        id="search"
        name="search"
        autoFocus
        required
        minLength={3}
        className="w-full bg-background peer focus:outline-none"
        type="search"
        placeholder="Search Perscriptions"
      />
      <SubmitSearch />
    </form>
  );
};

export const SubmitSearch = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-secondary transition-colors duration-250 ease-in-out group-hover:text-muted-foreground peer-focus:text-muted-foreground focus:text-secondary-foreground"
      aria-disabled={pending}
    >
      <SearchIcon />
      <span className="sr-only">submit query</span>
    </button>
  );
}