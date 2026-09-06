import { connectDB } from "@/lib/db";
import { connection } from "next/server";
import { ArtistModel } from "@/lib/models/Artist";
import { EventModel } from "@/lib/models/Event";
import { PlaylistModel } from "@/lib/models/Playlist";
import { PostModel } from "@/lib/models/Post";
import { ServiceModel } from "@/lib/models/Service";
import { SiteSettingsModel } from "@/lib/models/SiteSettings";
import { VideoModel } from "@/lib/models/Video";
import { Post } from "@/types/blog";
import { Artist, EventItem, Playlist, Service } from "@/types/platform";

export const siteConfig = {
  name: "KaboomKlub",
  tagline: "African Music, Culture, Business & Entertainment",
  handle: "@kaboomklub",
  baseUrl: "https://kaboomklub.com",
  newsletterName: "The Kaboomklub Brief",
  newsletterDescription: "The week in African music, culture, business and entertainment — delivered to your inbox.",
  mission: "Discover the music, people, ideas and stories shaping Africa's culture and creative economy.",
  companyNote: "Kaboomklub is a media platform powered by Fish Art X.",
};

export const mainNav = [
  { href: "/", label: "Home" }, { href: "/music", label: "Music" }, { href: "/entertainment", label: "Entertainment" },
  { href: "/culture", label: "Culture" }, { href: "/business", label: "Business" }, { href: "/features", label: "Features" },
  { href: "/playlists", label: "Playlists" }, { href: "/artists", label: "Artists" }, { href: "/events", label: "Events" }, { href: "/video", label: "Video" },
] as const;

export const categories = [
  { slug: "music", label: "MUSIC", color: "#b3241b", description: "Music news, new releases, artist stories, discovery, and the records shaping the conversation." },
  { slug: "entertainment", label: "ENTERTAINMENT", color: "#7c3aed", description: "Nollywood, film, TV, streaming, concerts, festivals, and the entertainment stories connected to culture." },
  { slug: "culture", label: "CULTURE", color: "#f2c14e", description: "African culture, fashion, lifestyle, youth culture, digital trends, and the creative movements shaping identity." },
  { slug: "business", label: "BUSINESS", color: "#1a8f6e", description: "Music business, creative economy, startups, entrepreneurship, technology, and the systems behind growth." },
  { slug: "features", label: "FEATURES", color: "#e85d04", description: "Original KaboomKlub editorial — interviews, artist spotlights, profiles, explainers, and deep dives." },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/kaboomklub/", icon: "instagram" }, { label: "TikTok", href: "https://www.tiktok.com/@kaboomklub", icon: "tiktok" },
  { label: "X", href: "https://x.com/kaboomklub", icon: "x" }, { label: "YouTube", href: "https://www.youtube.com/@kaboomklub", icon: "youtube" }, { label: "Spotify", href: "https://open.spotify.com/", icon: "spotify" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

type PublicPost = Post & { id: string };

function mapPost(post: { _id: unknown; slug: string; title: string; excerpt: string; body: string[]; category: Post["category"]; subcategory: string; contentFormat?: Post["contentFormat"]; categoryColor: string; author: string; authorRole: string; date: string; updatedDate: string; readTime: string; image: string; imageCaption: string; priority: Post["priority"]; featured: boolean; tags: string[]; seoTitle: string; seoDescription: string; socialImage: string }): PublicPost {
  return { id: String(post._id), slug: post.slug, title: post.title, excerpt: post.excerpt, body: post.body, category: post.category, subcategory: post.subcategory, contentFormat: post.contentFormat, categoryColor: post.categoryColor, author: post.author, authorRole: post.authorRole, date: post.date, updatedDate: post.updatedDate, readTime: post.readTime, image: post.image, imageCaption: post.imageCaption, priority: post.priority, featured: post.featured, tags: post.tags, seoTitle: post.seoTitle, seoDescription: post.seoDescription, socialImage: post.socialImage };
}

function mapArtist(artist: { _id: unknown; slug: string; name: string; bio: string; genre: string; location: string; image: string; latestRelease?: string; socialLinks: Artist["socialLinks"]; tags: string[]; featured: boolean }): Artist {
  return { id: String(artist._id), slug: artist.slug, name: artist.name, bio: artist.bio, genre: artist.genre, location: artist.location, image: artist.image, latestRelease: artist.latestRelease, socialLinks: artist.socialLinks, tags: artist.tags, featured: artist.featured };
}

function mapPlaylist(item: { _id: unknown; slug: string; title: string; description: string; platform: string; href: string; image: string; cadence: string }): Playlist {
  return { id: String(item._id), slug: item.slug, title: item.title, description: item.description, platform: item.platform, href: item.href, image: item.image, cadence: item.cadence };
}

function mapEvent(item: { _id: unknown; slug: string; name: string; date: string; location: string; description: string; artists: string[]; organizer: string; href: string; image: string }): EventItem {
  return { id: String(item._id), slug: item.slug, name: item.name, date: item.date, location: item.location, description: item.description, artists: item.artists, organizer: item.organizer, href: item.href, image: item.image };
}

function mapService(item: { _id: unknown; slug: string; title: string; description: string; audience: string; deliverables: string[]; ctaLabel: string; ctaHref: string }): Service {
  return { id: String(item._id), slug: item.slug, title: item.title, description: item.description, audience: item.audience, deliverables: item.deliverables, ctaLabel: item.ctaLabel, ctaHref: item.ctaHref };
}

async function db() { try { await connection(); await connectDB(); return true; } catch { return false; } }

export async function getPosts(): Promise<Post[]> { if (!(await db())) return []; return (await PostModel.find({ status: "PUBLISHED" }).sort({ publishedAt: -1, createdAt: -1 }).lean()).map(mapPost); }
export async function getFeaturedPost(): Promise<Post | undefined> { if (!(await db())) return undefined; const post = await PostModel.findOne({ status: "PUBLISHED", featured: true }).sort({ publishedAt: -1, createdAt: -1 }).lean() ?? await PostModel.findOne({ status: "PUBLISHED" }).sort({ priority: 1, publishedAt: -1, createdAt: -1 }).lean(); return post ? mapPost(post) : undefined; }
export async function getPostsByPriority(priority: Post["priority"]): Promise<Post[]> { if (!(await db())) return []; return (await PostModel.find({ status: "PUBLISHED", priority }).sort({ publishedAt: -1, createdAt: -1 }).lean()).map(mapPost); }
export async function getPostsByCategory(slug: string): Promise<Post[]> { if (!(await db())) return []; return (await PostModel.find({ status: "PUBLISHED", category: slug.toUpperCase() as Post["category"] }).sort({ publishedAt: -1, createdAt: -1 }).lean()).map(mapPost); }
export async function getLatestPosts(limit?: number): Promise<Post[]> { if (!(await db())) return []; const query = PostModel.find({ status: "PUBLISHED" }).sort({ publishedAt: -1, createdAt: -1 }); if (limit) query.limit(limit); return (await query.lean()).map(mapPost); }
export async function getPostBySlug(slug: string): Promise<Post | undefined> { if (!(await db())) return undefined; const post = await PostModel.findOne({ slug: slug.toLowerCase(), status: "PUBLISHED" }).lean(); return post ? mapPost(post) : undefined; }
export function getCategoryMeta(slug: string) { return categories.find((category) => category.slug === slug); }
export async function getPostsByContentFormat(format: string): Promise<Post[]> { if (!(await db())) return []; return (await PostModel.find({ status: "PUBLISHED", contentFormat: format as Post["contentFormat"] }).sort({ publishedAt: -1, createdAt: -1 }).lean()).map(mapPost); }
export async function getTrendingPosts(limit = 5): Promise<Post[]> { if (!(await db())) return []; return (await PostModel.find({ status: "PUBLISHED", priority: { $in: ["MAJOR", "SECONDARY"] } }).sort({ publishedAt: -1, createdAt: -1 }).limit(limit).lean()).map(mapPost); }
export async function getPlaylists(): Promise<Playlist[]> { if (!(await db())) return []; return (await PlaylistModel.find({ status: "PUBLISHED" }).sort({ featured: -1, createdAt: -1 }).lean()).map(mapPlaylist); }
export async function getServices(): Promise<Service[]> { if (!(await db())) return []; return (await ServiceModel.find({ status: "PUBLISHED" }).sort({ order: 1, createdAt: -1 }).lean()).map(mapService); }
export async function getServiceBySlug(slug: string): Promise<Service | undefined> { if (!(await db())) return undefined; const item = await ServiceModel.findOne({ slug: slug.toLowerCase(), status: "PUBLISHED" }).lean(); return item ? mapService(item) : undefined; }
export async function getEvents(): Promise<EventItem[]> { if (!(await db())) return []; return (await EventModel.find({ status: "PUBLISHED" }).sort({ date: 1, createdAt: -1 }).lean()).map(mapEvent); }
export async function getVideos() { if (!(await db())) return []; return (await VideoModel.find({ status: "PUBLISHED" }).sort({ featured: -1, createdAt: -1 }).lean()).map((video) => ({ id: String(video._id), title: video.title, description: video.description, thumbnail: video.thumbnail, platform: video.platform, videoUrl: video.videoUrl, embedUrl: video.embedUrl, category: video.category })); }
export async function getOpportunities() { return []; }
export async function getArtists(): Promise<Artist[]> { if (!(await db())) return []; return (await ArtistModel.find({ status: "PUBLISHED" }).sort({ featured: -1, createdAt: -1 }).lean()).map(mapArtist); }
export async function getFeaturedArtists(): Promise<Artist[]> { if (!(await db())) return []; return (await ArtistModel.find({ status: "PUBLISHED", featured: true }).sort({ createdAt: -1 }).lean()).map(mapArtist); }
export async function getArtistBySlug(slug: string): Promise<Artist | undefined> { if (!(await db())) return undefined; const artist = await ArtistModel.findOne({ slug: slug.toLowerCase(), status: "PUBLISHED" }).lean(); return artist ? mapArtist(artist) : undefined; }
export async function getDiscoverPosts(limit?: number): Promise<Post[]> { if (!(await db())) return []; const query = PostModel.find({ status: "PUBLISHED", subcategory: { $in: ["Emerging Artists", "Artist Stories", "New Releases"] } }).sort({ publishedAt: -1, createdAt: -1 }); if (limit) query.limit(limit); return (await query.lean()).map(mapPost); }
export async function getSearchDocuments(query: string, category?: string): Promise<Post[]> { if (!(await db())) return []; const filter: Record<string, unknown> = { status: "PUBLISHED" }; if (category && category !== "all") filter.category = category.toUpperCase(); const term = query.trim(); if (term) filter.$or = [{ title: { $regex: term, $options: "i" } }, { excerpt: { $regex: term, $options: "i" } }, { tags: { $regex: term, $options: "i" } }, { author: { $regex: term, $options: "i" } }]; return (await PostModel.find(filter).sort({ publishedAt: -1, createdAt: -1 }).lean()).map(mapPost); }

export async function getSiteSettings() {
  if (!(await db())) return null;
  try { return await SiteSettingsModel.findOne({ key: "main" }).lean(); } catch { return null; }
}

export async function getPublicSiteConfig() {
  const settings = await getSiteSettings();
  if (!settings) return siteConfig;
  return { ...siteConfig, name: settings.siteName || siteConfig.name, tagline: settings.tagline || siteConfig.tagline, baseUrl: settings.siteUrl || siteConfig.baseUrl, newsletterName: settings.newsletterName || siteConfig.newsletterName, newsletterDescription: settings.newsletterDescription || siteConfig.newsletterDescription, mission: settings.shortDescription || siteConfig.mission };
}
