"use client";

import dynamic from "next/dynamic";
import { useActionState } from "react";
import { savePostAction, type PostFormState } from "@/lib/actions/posts";
import { AdminFormField, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/AdminFormField";

const MediaSelector = dynamic(
  () => import("@/components/admin/MediaSelector"),
  { ssr: false, loading: () => <p className="text-xs text-white/40">Loading media picker…</p> }
);

const categories = ["MUSIC", "ENTERTAINMENT", "CULTURE", "BUSINESS", "FEATURES"];
const formats = ["News", "Feature", "Interview", "Artist Spotlight", "Review", "Explainer", "Deep Dive", "Industry Watch", "Culture Watch", "The Business of Music", "Opinion", "Roundup", "Profile"];

type PostValues = {
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  category?: string;
  contentFormat?: string;
  priority?: string;
  status?: string;
  tags?: string;
  image?: string;
  socialImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  author?: string;
  authorRole?: string;
  readTime?: string;
  featured?: boolean;
};

export default function PostForm({ id, post }: { id: string | null; post?: PostValues }) {
  const [state, formAction, isPending] = useActionState<PostFormState, FormData>(savePostAction.bind(null, id), null);
  const error = (name: string) => state?.fieldErrors?.[name]?.[0];
  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <AdminFormField label="Title" name="title" required error={error("title")}>
          <AdminInput id="title" name="title" required defaultValue={post?.title} />
        </AdminFormField>
        <AdminFormField label="Slug" name="slug" hint="Leave blank to generate from the title.">
          <AdminInput id="slug" name="slug" defaultValue={post?.slug} />
        </AdminFormField>
        <AdminFormField label="Excerpt" name="excerpt" error={error("excerpt")}>
          <AdminTextarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} />
        </AdminFormField>
        <AdminFormField label="Body" name="body" hint="Separate paragraphs with blank lines.">
          <AdminTextarea id="body" name="body" rows={14} defaultValue={post?.body} />
        </AdminFormField>
        <MediaSelector
          name="image"
          label="Featured Image"
          value={post?.image ?? ""}
          allowNone
          hint="Used as the hero image at the top of the story."
        />
        <MediaSelector
          name="socialImage"
          label="Social Share Image"
          value={post?.socialImage ?? ""}
          allowNone
          hint="Used for OpenGraph/Twitter cards. Defaults to the featured image."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminFormField label="SEO Title" name="seoTitle">
            <AdminInput id="seoTitle" name="seoTitle" defaultValue={post?.seoTitle} />
          </AdminFormField>
          <AdminFormField label="SEO Description" name="seoDescription">
            <AdminTextarea id="seoDescription" name="seoDescription" rows={3} defaultValue={post?.seoDescription} />
          </AdminFormField>
        </div>
      </div>
      <div className="space-y-5">
        <AdminFormField label="Category" name="category" required error={error("category")}>
          <AdminSelect id="category" name="category" defaultValue={post?.category ?? "MUSIC"}>
            {categories.map((value) => <option key={value}>{value}</option>)}
          </AdminSelect>
        </AdminFormField>
        <AdminFormField label="Content Format" name="contentFormat">
          <AdminSelect id="contentFormat" name="contentFormat" defaultValue={post?.contentFormat ?? "News"}>
            {formats.map((value) => <option key={value}>{value}</option>)}
          </AdminSelect>
        </AdminFormField>
        <AdminFormField label="Priority" name="priority">
          <AdminSelect id="priority" name="priority" defaultValue={post?.priority ?? "SECONDARY"}>
            <option>MAJOR</option><option>SECONDARY</option><option>SIDEBAR</option>
          </AdminSelect>
        </AdminFormField>
        <AdminFormField label="Status" name="status">
          <AdminSelect id="status" name="status" defaultValue={post?.status ?? "DRAFT"}>
            <option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option>
          </AdminSelect>
        </AdminFormField>
        <AdminFormField label="Tags" name="tags" hint="Comma-separated">
          <AdminInput id="tags" name="tags" defaultValue={post?.tags} />
        </AdminFormField>
        <AdminFormField label="Author" name="author">
          <AdminInput id="author" name="author" defaultValue={post?.author ?? "KABOOMKLUB TEAM"} />
        </AdminFormField>
        <AdminFormField label="Author Role" name="authorRole">
          <AdminInput id="authorRole" name="authorRole" defaultValue={post?.authorRole ?? "Editorial Desk"} />
        </AdminFormField>
        <AdminFormField label="Read Time" name="readTime">
          <AdminInput id="readTime" name="readTime" defaultValue={post?.readTime ?? "3 MIN READ"} />
        </AdminFormField>
        <label className="flex items-center gap-2 text-xs text-white/60">
          <input type="checkbox" name="featured" value="true" defaultChecked={post?.featured} /> Feature this story
        </label>
        <button disabled={isPending} className="w-full bg-[#b3241b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-50">
          {isPending ? "Saving..." : "Save Story"}
        </button>
        {state?.fieldErrors && <p className="text-xs font-bold text-[#b3241b]">Please correct the highlighted fields.</p>}
        {state?.error && <p className="text-xs font-bold text-[#b3241b]">{state.error}</p>}
      </div>
    </form>
  );
}