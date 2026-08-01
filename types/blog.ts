export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "MUSIC" | "ENTERTAINMENT" | "LIFESTYLE" | "SERVICES";
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  priority: "MAJOR" | "SECONDARY" | "SIDEBAR";
  featured: boolean;
}
