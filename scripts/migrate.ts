/**
 * scripts/migrate.ts
 * One-time migration: seeds MongoDB from existing JSON flat-files.
 * Run with: npx tsx scripts/migrate.ts
 *
 * IMPORTANT: Set MONGODB_URI and ADMIN_EMAIL + ADMIN_PASSWORD in .env.local first.
 * The script is idempotent — it uses upsert so it is safe to run multiple times.
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ── Raw JSON imports ──────────────────────────────────────────────────────────
import postsJson from "../data/posts.json" assert { type: "json" };
import artistsJson from "../data/artists.json" assert { type: "json" };
import playlistsJson from "../data/playlists.json" assert { type: "json" };
import eventsJson from "../data/events.json" assert { type: "json" };
import servicesJson from "../data/services.json" assert { type: "json" };

// ── Models ────────────────────────────────────────────────────────────────────
import { AdminUser } from "../lib/models/AdminUser";
import { PostModel } from "../lib/models/Post";
import { ArtistModel } from "../lib/models/Artist";
import { PlaylistModel } from "../lib/models/Playlist";
import { EventModel } from "../lib/models/Event";
import { ServiceModel } from "../lib/models/Service";
import { SiteSettingsModel } from "../lib/models/SiteSettings";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@kaboomklub.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123!";

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set. Add it to .env.local");
  process.exit(1);
}

// Utility: generate URL-safe slug from title
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Format date for display
function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

async function migrate() {
  console.log("🔌  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅  Connected\n");

  // ── 1. Admin User ──────────────────────────────────────────────────────────
  console.log("👤  Seeding admin user...");
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { email: ADMIN_EMAIL, passwordHash, name: "KaboomKlub Admin", role: "superadmin" },
    { upsert: true, new: true }
  );
  console.log(`   Admin: ${ADMIN_EMAIL} (password from ADMIN_PASSWORD env var)\n`);

  // ── 2. Site Settings ───────────────────────────────────────────────────────
  console.log("⚙️   Seeding site settings...");
  await SiteSettingsModel.findOneAndUpdate(
    { key: "main" },
    { key: "main" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log("   Site settings seeded\n");

  // ── 3. Posts ───────────────────────────────────────────────────────────────
  console.log(`📝  Migrating ${postsJson.length} posts...`);
  let postCount = 0;
  for (const p of postsJson as Record<string, unknown>[]) {
    const slug = (p.slug as string) || slugify(p.title as string);
    const now = new Date();
    await PostModel.findOneAndUpdate(
      { slug },
      {
        slug,
        title: p.title,
        excerpt: p.excerpt || "",
        body: Array.isArray(p.body) ? p.body : [],
        category: p.category,
        subcategory: p.subcategory || "",
        contentFormat: p.contentFormat || undefined,
        categoryColor: p.categoryColor || "#b3241b",
        author: p.author || "KABOOMKLUB TEAM",
        authorRole: p.authorRole || "Editorial Desk",
        date: p.date || formatDate(now),
        updatedDate: p.updatedDate || formatDate(now),
        readTime: p.readTime || "3 MIN READ",
        image: p.image || "/kaboom-logo.jpg",
        imageCaption: p.imageCaption || "",
        priority: p.priority || "SECONDARY",
        featured: p.featured || false,
        tags: Array.isArray(p.tags) ? p.tags : [],
        status: "PUBLISHED",
        seoTitle: p.seoTitle || p.title,
        seoDescription: p.seoDescription || p.excerpt || "",
        socialImage: p.socialImage || p.image || "/kaboom-logo.jpg",
        publishedAt: now,
      },
      { upsert: true, new: true }
    );
    postCount++;
  }
  console.log(`   ✅  ${postCount} posts migrated\n`);

  // ── 4. Artists ─────────────────────────────────────────────────────────────
  console.log(`🎤  Migrating ${artistsJson.length} artists...`);
  let artistCount = 0;
  for (const a of artistsJson as Record<string, unknown>[]) {
    const slug = (a.slug as string) || slugify(a.name as string);
    await ArtistModel.findOneAndUpdate(
      { slug },
      {
        slug,
        name: a.name,
        bio: a.bio || "",
        genre: a.genre || "",
        location: a.location || "",
        image: a.image || "/kaboom-logo.jpg",
        latestRelease: a.latestRelease || undefined,
        socialLinks: a.socialLinks || {},
        tags: Array.isArray(a.tags) ? a.tags : [],
        featured: a.featured || false,
        status: "PUBLISHED",
      },
      { upsert: true, new: true }
    );
    artistCount++;
  }
  console.log(`   ✅  ${artistCount} artists migrated\n`);

  // ── 5. Playlists ───────────────────────────────────────────────────────────
  console.log(`🎵  Migrating ${playlistsJson.length} playlists...`);
  let playlistCount = 0;
  for (const pl of playlistsJson as Record<string, unknown>[]) {
    const slug = (pl.slug as string) || slugify(pl.title as string);
    await PlaylistModel.findOneAndUpdate(
      { slug },
      {
        slug,
        title: pl.title,
        description: pl.description || "",
        platform: pl.platform || "Spotify",
        href: pl.href || "",
        image: pl.image || "/kaboom-logo.jpg",
        cadence: pl.cadence || "Updated Regularly",
        featured: false,
        status: "PUBLISHED",
      },
      { upsert: true, new: true }
    );
    playlistCount++;
  }
  console.log(`   ✅  ${playlistCount} playlists migrated\n`);

  // ── 6. Events ──────────────────────────────────────────────────────────────
  console.log(`📅  Migrating ${eventsJson.length} events...`);
  let eventCount = 0;
  for (const e of eventsJson as Record<string, unknown>[]) {
    const slug = (e.slug as string) || slugify(e.name as string);
    await EventModel.findOneAndUpdate(
      { slug },
      {
        slug,
        name: e.name,
        date: e.date || "",
        location: e.location || "",
        description: e.description || "",
        artists: Array.isArray(e.artists) ? e.artists : [],
        organizer: e.organizer || "KaboomKlub",
        href: e.href || "",
        image: e.image || "/kaboom-logo.jpg",
        featured: false,
        status: "PUBLISHED",
      },
      { upsert: true, new: true }
    );
    eventCount++;
  }
  console.log(`   ✅  ${eventCount} events migrated\n`);

  // ── 7. Services ────────────────────────────────────────────────────────────
  console.log(`🛠️   Migrating ${servicesJson.length} services...`);
  let serviceCount = 0;
  for (const [i, s] of (servicesJson as Record<string, unknown>[]).entries()) {
    const slug = (s.slug as string) || slugify(s.title as string);
    await ServiceModel.findOneAndUpdate(
      { slug },
      {
        slug,
        title: s.title,
        description: s.description || "",
        audience: s.audience || "",
        deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
        ctaLabel: s.ctaLabel || "Get A Quote",
        ctaHref: s.ctaHref || "/contact",
        order: i,
        status: "PUBLISHED",
      },
      { upsert: true, new: true }
    );
    serviceCount++;
  }
  console.log(`   ✅  ${serviceCount} services migrated\n`);

  // ── Done ───────────────────────────────────────────────────────────────────
  console.log("🎉  Migration complete!");
  console.log(`\n   Admin login: ${ADMIN_EMAIL}`);
  console.log("   Password: (value of ADMIN_PASSWORD env var)\n");

  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌  Migration failed:", err);
  process.exit(1);
});
