import { SearchForm } from "./index";

export const Hero = async ({ query }: { query?: string }) => {
  return (
    // rename section classname in globals.css
    <section className="slate_container">
      <h1 className="heading">Heading</h1>
      <p className="sub-heading">
        Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Similique repellendus officiis dolore dolor,{" "}
      </p>

      <SearchForm query={query} />
    </section>
  );
};
