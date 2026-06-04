import posts from "@/data/posts.json";
import { Post } from "@/types/blog";

const allPosts = posts as Post[];

export const categories = [
  { slug: "entertainment", label: "ENTERTAINMENT", description: "Film, celebrity culture, pop moments, and the stories shaping screen-driven audiences." },
  { slug: "afrobeats", label: "AFROBEATS", description: "African music, artist culture, visuals, and the global movement around the sound." },
  { slug: "lifestyle", label: "LIFESTYLE", description: "Fashion, travel, beauty, wellness, and the everyday mood of a modern culture blog." },
  { slug: "tech", label: "TECH", description: "Tools, apps, devices, and creator workflows powering digital publishing and culture." },
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
