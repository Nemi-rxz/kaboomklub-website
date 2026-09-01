import posts from "@/data/posts.json";
import playlists from "@/data/playlists.json";
import services from "@/data/services.json";
import events from "@/data/events.json";
import opportunities from "@/data/opportunities.json";
import artists from "@/data/artists.json";
import { Post } from "@/types/blog";
import { Artist, EventItem, Opportunity, Playlist, Service } from "@/types/platform";

const allPosts = posts as Post[];
const allPlaylists = playlists as Playlist[];
const allServices = services as Service[];
const allEvents = events as EventItem[];
const allOpportunities = opportunities as Opportunity[];
const allArtists = artists as Artist[];

export const siteConfig = {
  name: "KaboomKlub",
  tagline: "African Music, Culture, Business & Entertainment",
  handle: "@kaboomklub",
  baseUrl: "https://kaboomklub.com",
  newsletterName: "The Kaboomklub Brief",
  newsletterDescription:
    "The week in African music, culture, business and entertainment — delivered to your inbox.",
  mission:
    "Discover the music, people, ideas and stories shaping Africa's culture and creative economy.",
  companyNote: "Kaboomklub is a media platform powered by Fish Art X.",
};

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/entertainment", label: "Entertainment" },
  { href: "/culture", label: "Culture" },
  { href: "/business", label: "Business" },
  { href: "/features", label: "Features" },
  { href: "/playlists", label: "Playlists" },
  { href: "/artists", label: "Artists" },
  { href: "/events", label: "Events" },
  { href: "/video", label: "Video" },
] as const;

export const categories = [
  { slug: "music", label: "MUSIC", color: "#b3241b", description: "Music news, new releases, artist stories, discovery, and the records shaping the conversation." },
  { slug: "entertainment", label: "ENTERTAINMENT", color: "#7c3aed", description: "Nollywood, film, TV, streaming, concerts, festivals, and the entertainment stories connected to culture." },
  { slug: "culture", label: "CULTURE", color: "#f2c14e", description: "African culture, fashion, lifestyle, youth culture, digital trends, and the creative movements shaping identity." },
  { slug: "business", label: "BUSINESS", color: "#1a8f6e", description: "Music business, creative economy, startups, entrepreneurship, technology, and the systems behind growth." },
  { slug: "features", label: "FEATURES", color: "#e85d04", description: "Original KaboomKlub editorial — interviews, artist spotlights, profiles, explainers, and deep dives." },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kaboomklub/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@kaboomklub", icon: "tiktok" },
  { label: "X", href: "https://x.com/kaboomklub", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/@kaboomklub", icon: "youtube" },
  { label: "Spotify", href: "https://open.spotify.com/", icon: "spotify" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

// Posts
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

export function getLatestPosts(limit?: number): Post[] {
  return limit ? allPosts.slice(0, limit) : allPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getCategoryMeta(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getPostsByContentFormat(format: string): Post[] {
  return allPosts.filter((post) => post.contentFormat === format);
}

export function getTrendingPosts(limit: number = 5): Post[] {
  return allPosts
    .filter((post) => post.priority === "MAJOR" || post.priority === "SECONDARY")
    .slice(0, limit);
}

// Playlists
export function getPlaylists(): Playlist[] {
  return allPlaylists;
}

// Services
export function getServices(): Service[] {
  return allServices;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}

// Events
export function getEvents(): EventItem[] {
  return allEvents;
}

// Opportunities
export function getOpportunities(): Opportunity[] {
  return allOpportunities;
}

// Artists
export function getArtists(): Artist[] {
  return allArtists;
}

export function getFeaturedArtists(): Artist[] {
  return allArtists.filter((a) => a.featured);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return allArtists.find((a) => a.slug === slug);
}

// Discovery
export function getDiscoverPosts(limit?: number): Post[] {
  const discoverPosts = allPosts.filter((post) =>
    ["Emerging Artists", "Artist Stories", "New Releases"].includes(post.subcategory)
  );
  return limit ? discoverPosts.slice(0, limit) : discoverPosts;
}

// Search
export function getSearchDocuments(query: string, category?: string) {
  const term = query.trim().toLowerCase();

  const filteredPosts = allPosts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category,
      post.subcategory,
      post.author,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !term || haystack.includes(term);
    const matchesCategory = !category || category === "all" || post.category.toLowerCase() === category.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  return filteredPosts;
}
