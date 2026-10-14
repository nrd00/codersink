import FilteredBlogs from "@/components/FilteredBlogs";

const page = () => {
  return (
    <section>
      <div className="mb-10 container">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mt-5">
          Explore All blogs
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base mb-5">
          Filter articles by category, search instantly, and toggle loading
          states to test Suspense boundaries.
        </p>
        {/* Search, filters, and results */}
        <FilteredBlogs />
      </div>
    </section>
  );
};

export default page;
