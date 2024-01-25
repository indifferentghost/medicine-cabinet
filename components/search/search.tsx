'use client'
import { SearchIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useFormStatus } from "react-dom";

export const Search = <T extends (formdata: FormData) => void>({ search }: { search: T }) => {
  const inputRef = useRef<ElementRef<'input'>>(null);

  const handleFormClick = () => {
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <form action={search} onClick={handleFormClick} className="px-5 flex items-center justify-center border-2 border-border rounded-lg bg-muted h-10 w-72 cursor-text group transition-all will-change-transform duration-200 ease-in-out has-[button:hover]:delay-200 has-[button:focus]:w-72 hover:border-secondary-foreground focus-within:border-secondary-foreground focus-within:w-full">
      <label htmlFor="search" className="sr-only">
        Search Perscriptions
      </label>
      <input
        ref={inputRef}
        id="search"
        name="search"
        autoFocus
        required
        minLength={3}
        className="bg-transparent w-full peer focus:outline-none"
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
      onClick={(e) => (console.log('clicked'),e.stopPropagation())}
      className="text-border p-1 transition-colors duration-200 ease-in-out focus:text-foreground active:bg-primary/10 group-hover:text-foreground peer-focus:text-foreground hover:!text-primary"
      aria-disabled={pending}
    >
      <SearchIcon />
      <span className="sr-only">submit query</span>
    </button>
  );
}