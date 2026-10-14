import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Colored cover */}
      <Link
        href={`/blogs/${blog.slug}`}
        aria-label={`Read ${blog.title}`}
        className={`relative flex h-53.75 shrink-0 items-center justify-center ${blog.color}`}
      >
        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-medium text-white">
          {blog.category}
        </span>

        {/* Cover title */}
        <h2 className="max-w-[90%] px-4 text-center text-2xl font-semibold leading-snug text-white sm:text-[30px]">
          {blog.id === 1
            ? "Next.js App Router"
            : blog.id === 2
              ? "Tailwind CSS v4"
              : blog.id === 3
                ? "AI Agents Web"
                : blog.category}
        </h2>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date and reading time */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        {/* Blog title */}
        <Link href={`/blogs/${blog.slug}`} className="mt-2">
          <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-indigo-600">
            {blog.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
          {blog.description}
        </p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${blog.avatarColor}`}
          >
            {blog.initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">
              {blog.author}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {blog.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
