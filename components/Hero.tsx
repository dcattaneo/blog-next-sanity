import { SearchForm } from "./index";

export const Hero = async ({ query }: { query?: string }) => {
  return (
    // rename section classname in globals.css
    <section className="hero_container">
      <h1 className="heading">Share your article</h1>
      <p className="sub-heading">
        This site is the right place for you to share your knowledge and
        interests with the developer community.
      </p>

      <SearchForm query={query} />
    </section>
  );
};
