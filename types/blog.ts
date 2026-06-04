export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "ENTERTAINMENT" | "AFROBEATS" | "LIFESTYLE" | "TECH";
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  priority: "MAJOR" | "SECONDARY" | "SIDEBAR";
  featured: boolean;
}
