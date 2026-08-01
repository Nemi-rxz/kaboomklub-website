import posts from "@/data/posts.json";
import { Post } from "@/types/blog";

const allPosts = posts as Post[];

export const categories = [
  { slug: "music", label: "MUSIC", description: "Afrobeats, artists, playlists, music moments, and regular update posts." },
  { slug: "entertainment", label: "ENTERTAINMENT", description: "Events, performances, pop culture, arenas, and entertainment stories." },
  { slug: "lifestyle", label: "LIFESTYLE", description: "Fashion, culture, city moments, and visual lifestyle updates." },
  { slug: "services", label: "SERVICES", description: "DJ sets, playlists, publicity, and simple service-focused KaboomKlub updates." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getPosts(): Post[] {
  return allPosts;
}

export function getFeaturedPost(): Post {
  return allPosts.find((post) => post.featured) ?? allPosts[0];
}

export function getPostsByPriority(priority: Post["priority"]): Post[] {
  return allPosts.filter((post) => post.priority === priority);
}

export function getPostsByCategory(slug: string): Post[] {
  return allPosts.filter((post) => post.category.toLowerCase() === slug.toLowerCase());
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getCategoryMeta(slug: string) {
  return categories.find((category) => category.slug === slug);
}
