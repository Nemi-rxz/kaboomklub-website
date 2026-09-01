export type CategoryType = "MUSIC" | "ENTERTAINMENT" | "CULTURE" | "BUSINESS" | "FEATURES";

export type ContentFormat =
  | "News"
  | "Feature"
  | "Interview"
  | "Artist Spotlight"
  | "Review"
  | "Explainer"
  | "Deep Dive"
  | "Industry Watch"
  | "Culture Watch"
  | "The Business of Music"
  | "Opinion"
  | "Roundup"
  | "Profile";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryType;
  subcategory: string;
  contentFormat?: ContentFormat;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  updatedDate: string;
  readTime: string;
  image: string;
  imageCaption: string;
  priority: "MAJOR" | "SECONDARY" | "SIDEBAR";
  featured: boolean;
  tags: string[];
  body: string[];
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
}
