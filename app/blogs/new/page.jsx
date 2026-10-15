"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, FileText } from "lucide-react";

const initialForm = {
  title: "",
  category: "",
  author: "",
  image: "",
  excerpt: "",
  content: "",
};

export default function NewBlogPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function validate() {
    const nextErrors = {};

    if (form.title.trim().length < 5) {
      nextErrors.title = "Title must contain at least 5 characters.";
    } else if (form.title.trim().length > 120) {
      nextErrors.title = "Title cannot exceed 120 characters.";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category.";
    }

    if (form.author.trim().length < 2) {
      nextErrors.author = "Enter a valid author name.";
    }

    if (form.image.trim()) {
      try {
        const url = new URL(form.image.trim());
        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        nextErrors.image = "Enter a valid HTTP or HTTPS image URL.";
      }
    }

    if (form.excerpt.trim().length < 20) {
      nextErrors.excerpt = "Summary must contain at least 20 characters.";
    } else if (form.excerpt.trim().length > 300) {
      nextErrors.excerpt = "Summary cannot exceed 300 characters.";
    }

    if (form.content.trim().length < 50) {
      nextErrors.content = "Content must contain at least 50 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!validate()) {
      setStatus("Please correct the highlighted fields.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          author: form.author.trim(),
          image: form.image.trim(),
          excerpt: form.excerpt.trim(),
          content: form.content.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save the blog.");
      }

      window.location.href = "/admin";
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  function FieldError({ field }) {
    return errors[field] ? (
      <p className="mt-1.5 text-xs text-red-600">{errors[field]}</p>
    ) : null;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <FileText size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Create New Blog Post
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                  Add your article details and publish your content.
                </p>
              </div>
            </div>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6 px-6 py-6 sm:px-8">
              {status && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {status}
                </p>
              )}

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={120}
                  placeholder="Enter an engaging title"
                  className={inputClass("title")}
                  aria-invalid={!!errors.title}
                />
                <div className="mt-1 flex justify-between gap-2">
                  <FieldError field="title" />
                  <span className="ml-auto text-xs text-slate-400">
                    {form.title.length}/120
                  </span>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass("category")}
                  >
                    <option value="">Select a category</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Development">Development</option>
                    <option value="Technology">Technology</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Design">Design</option>
                  </select>
                  <FieldError field="category" />
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    maxLength={80}
                    placeholder="Enter author name"
                    className={inputClass("author")}
                  />
                  <FieldError field="author" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Featured Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass("image")}
                />
                <FieldError field="image" />
                <p className="mt-1.5 text-xs text-slate-400">
                  Optional. Use a publicly accessible image URL.
                </p>
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Excerpt / Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  maxLength={300}
                  placeholder="Write a short summary of your article..."
                  className={`${inputClass("excerpt")} resize-y`}
                />
                <div className="mt-1 flex justify-between gap-2">
                  <FieldError field="excerpt" />
                  <span className="ml-auto text-xs text-slate-400">
                    {form.excerpt.length}/300
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Full Content (Markdown Supported){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Write your full blog content here..."
                  className={`${inputClass("content")} min-h-64 resize-y font-mono leading-6`}
                />
                <div className="mt-1 flex justify-between gap-2">
                  <FieldError field="content" />
                  <span className="ml-auto text-xs text-slate-400">
                    {form.content.trim().length} characters
                  </span>
                </div>
              </div>
            </div>

            <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Blog Post"}
              </button>
            </footer>
          </form>
        </section>
      </div>
    </main>
  );
}
