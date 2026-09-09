import type { MetadataRoute } from "next";
import {
  getPosts,
  getArtists,
  getPlaylists,
  getEvents,
  getVideos,
  getPublicSiteConfig,
} from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getPublicSiteConfig();
  const base = (config.baseUrl?.trim() || "https://kaboomklub.com").replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "/",
    "/music",
    "/entertainment",
    "/culture",
    "/business",
    "/features",
    "/stories",
    "/artists",
    "/playlists",
    "/video",
    "/videos",
    "/events",
    "/newsletter",
    "/search",
    "/about",
    "/contact",
    "/advertise",
    "/services",
    "/submit",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : 0.7,
  }));

  const [posts, artists, playlists, events, videos] = await Promise.all([
    getPosts().catch(() => []),
    getArtists().catch(() => []),
    getPlaylists().catch(() => []),
    getEvents().catch(() => []),
    getVideos().catch(() => []),
  ]);

  const categoryPaths = ["music", "entertainment", "culture", "business", "features"];
  const categoryEntries: MetadataRoute.Sitemap = categoryPaths.map((c) => ({
    url: `${base}/category/${c}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const storyEntries: MetadataRoute.Sitemap = posts.map((p) => {
    const updated = p.updatedDate ? new Date(String(p.updatedDate)) : p.date ? new Date(String(p.date)) : now;
    return {
      url: `${base}/story/${p.slug}`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    };
  });

  const artistEntries: MetadataRoute.Sitemap = artists.map((a) => ({
    url: `${base}/artists/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const playlistEntries: MetadataRoute.Sitemap = playlists.map(() => ({
    url: `${base}/playlists`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map(() => ({
    url: `${base}/events`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const videoEntries: MetadataRoute.Sitemap = videos.map(() => ({
    url: `${base}/video`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...storyEntries,
    ...artistEntries,
    ...playlistEntries,
    ...eventEntries,
    ...videoEntries,
  ];
}
