import { SearchForm } from "./index";

export const Hero = async ({ query }: { query?: string }) => {
  return (
    <section className="hero_container">
      <h1 className="heading  text-4xl font-bold text-gradient dark:text-gradient-dark">
        Share your article
      </h1>
      <p className="sub-heading font-normal">
        This site is the right place for you to{" "}
        <strong className=" font-medium text-[#111] dark:text-gradient-dark">
          share your knowledge
        </strong>{" "}
        and interests with the community.
      </p>

      <SearchForm query={query} />
    </section>
  );
};
