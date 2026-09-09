# KABOOMKLUB PROJECT BIBLE

> The source of truth for the Kaboomklub website project — architecture, routes, CMS, media, auth, data, SEO, analytics, security, performance, deployment, and launch checklist.

---

## 1. BRAND POSITIONING

**Kaboomklub — African Music, Culture, Business & Entertainment.**

> "Discover the music, people, ideas and stories shaping Africa's culture and creative economy."

Kaboomklub is a modern African digital media platform. Music is the strongest identity marker, but Kaboomklub is not only a music blog. It operates as a broader media platform covering:

- African Music & Afrobeats
- Entertainment (Nollywood, film, TV, streaming, pop culture)
- Culture (fashion, lifestyle, art, digital culture, youth culture)
- Business (music business, creative economy, startups, entrepreneurship)
- Features (original editorial: interviews, spotlights, explainers, deep dives)

**Company note:** Kaboomklub is a media platform powered by Fish Art X.

---

## 2. STRATEGIC DIRECTION

| Instagram / TikTok / Social | Website (kaboomklub.com) |
|---|---|
| Discovery | Full stories |
| Short-form content | Original journalism |
| Community | Features & interviews |
| Conversation | Artist profiles |
| Promotion | Music discovery |
| Distribution | Reviews & analysis |
| Breaking content | Music business coverage |
| | Culture & business stories |
| | Videos & playlists |
| | Events |
| | Media archive |
| | Commercial services |

The website is the **central digital home**. Social media is the **distribution network**.

---

## 3. TECH STACK

| Item | Version / Detail |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| React | 19.2.4 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| CMS / DB | MongoDB Atlas + Mongoose 9 |
| Auth | JWT via `jose` (cookie `kk_admin_session`, 7d) |
| Media / CDN | Cloudinary v2 (folder `kaboomklub`) |
| Deployment | Vercel (auto-deploy on push) |
| Image optimizer | Next/Image (allowlist: `res.cloudinary.com`) |
| Fonts | Inter (next/font/google) |
| Validation | Zod v4 server-side validation |
| Analytics | GA4 conditional via `NEXT_PUBLIC_GA_MEASUREMENT_ID` |

**Key Next.js 16 conventions:**
- All page `params` are `Promise<{...}>` and must be awaited
- `cacheComponents: true` in `next.config.ts` — use `<Suspense>` boundaries for async data reads in universal layouts/pages
- All components are Server Components by default; Client Components use `"use client"`
- Route Handlers + Server Actions in `app/api/**` and `lib/actions/**`

---

## 4. FOLDER STRUCTURE

```
kaboomklub-app/
├── app/
│   ├── layout.tsx                  # Root layout — metadata + Inter + Organization JSON-LD + GA4
│   ├── page.tsx                  # Homepage (Website JSON-LD + SearchAction)
│   ├── globals.css               # Tailwind v4 + design tokens
│   ├── robots.ts                 # robots.txt (allow + /sitemap.xml link + /admin disallow
│   ├── sitemap.ts                # sitemap.xml (static + category + published story/artist/playlist/event/video
│   ├── stories/page.tsx
│   ├── story/[slug]/page.tsx       # Story page + NewsArticle JSON-LD
│   ├── category/[slug]/page.tsx
│   ├── music/ entertainment/ culture/ business/ features/
│   ├── playlists/page.tsx
│   ├── artists/ page.tsx + [slug]/page.tsx
│   ├── events/page.tsx          # Events + EventList JSON-LD
│   ├── video/page.tsx + videos page (both routes)
│   ├── services/ advertise/ submit/ contact/ newsletter/ about/ search/
│   ├── api/
│   │   ├── upload/route.ts        # Computer upload → Cloudinary → Media record
│   │   ├── media/
│   │   │   ├── route.ts        # GET paginated media list (for MediaSelector
│   │   │   └── import/route.ts   # POST SSRF-guarded Internet → Cloudinary → Media
│   │   └── unsubscribe/route.ts
│   └── admin/
│       ├── login
│       ├── dashboard (/admin)
│       ├── content (stories (list + new + [id])
│       ├── media (page + MediaUploader + MediaSelector)
│       ├── artists playlists events videos services + (new + [id])
│       ├── inquiries submissions newsletter (inboxes)
│       ├── settings (logo/favicon/defaultSocialImage via MediaSelector)
│       └── shared/CrudForm.tsx (type:image + MediaSelector)
├── components/
│   ├── PublicImage.tsx             # Cloudinary-safe renderer + unoptimized for externals
│   ├── EditorialNavbar / Footer / MajorHeadline / PostCard
│   ├── admin/
│   │   └── MediaSelector.tsx     # 5-mode picker: Library / Upload / Import URL / External / None
│   └── seo/ (4 JSON-LD helpers: OrganizationLd / WebsiteLd / NewsArticleLd / EventListLd
├── lib/
│   ├── posts.ts                # Public data access layer + siteConfig + nav
│   ├── db.ts                   # connectDB() singleton
│   ├── auth.ts / session handling
│   ├── cloudinary.ts            # Cloudinary SDK singleton + helpers
│   ├── actions/              # Server actions: posts / artists / playlists / events / videos / media / services / submissions / inquiries / newsletter / settings
│   └── models/                 # Mongoose schemas: Post / Artist / Playlist / Event / Video / Service / Subscriber / Inquiry / Submission / SiteSettings / Media / AdminUser
├── types/ (blog.ts / platform.ts)
├── scripts/migrate.ts              # seed + JSON→Mongo migration (seed admin)
├── middleware.ts                 # Edge-level /admin:* and /api/admin:* gate
├── next.config.ts / postcss.config.mjs / tsconfig.json / eslint.config.mjs
└── .env.local.example             # Example env vars template
```

---

## 5. ROUTES

### Public

| Route | Status | Description |
|---|---|---|
| `/` | ✅ Live | Homepage + Website/SearchAction JSON-LD |
| `/stories` | ✅ Live | All stories archive |
| `/story/[slug]` | ✅ Live | Individual story + NewsArticle JSON-LD |
| `/category/[slug]` | ✅ Live | Category listing |
| `/music` `/entertainment` `/culture` `/business` `/features` | ✅ Live | Section pages |
| `/playlists` | ✅ Live | Playlist listing |
| `/artists` + `/artists/[slug]` | ✅ Live | Artists + profiles |
| `/events` | ✅ Live | Events + EventList JSON-LD |
| `/video` `/videos` | ✅ Live | Video section (both) |
| `/services` `/advertise` `/submit` `/contact` `/newsletter` `/about` `/search` | ✅ Live | Commercial & utilities |

### API / ADMIN & API

| Route | Auth | Description |
|---|---|---|
| `/admin/login` | public | Admin login |
| `/admin/*` | JWT session | Dashboard, CRUD, inboxes, settings, media |
| `/api/upload` | JWT session | Computer → Cloudinary → Media record |
| `/api/media` | JWT session | GET paginated + search (for MediaSelector |
| `/api/media/import` | JWT session | Internet URL import with SSRF guard + size + type |
| `/api/unsubscribe` | public token | Newsletter unsubscribe |

---

## 6. CONTENT ARCHITECTURE

### Primary Content Pillars

1. **MUSIC** — `#b3241b`
2. **ENTERTAINMENT** — `#7c3aed`
3. **CULTURE** — `#f2c14e`
4. **BUSINESS** — `#1a8f6e`
5. **FEATURES** — `#e85d04`

### Content Formats

Interviews, Artist Spotlight, Explains, The Business of Music, Culture Watch, Industry Watch, Reviews, Deep Dive, Sessions (performance), plus general News / Feature / Review / Explainer / Profile.

### Data Models

All in `lib/models/*`:

- **Post (Post** — id slug title excerpt category subcategory contentFormat categoryColor author authorRole date updatedDate readTime image imageCaption priority featured tags body[] seoTitle seoDescription socialImage status publishedAt
- **Artist** — slug name bio genre location image latestRelease socialLinks tags featured status
- **Playlist** — slug title description platform href image cadence featured status
- **Event** — slug name date location description artists organizer href image featured status
- **Video** — slug title description thumbnail platform videoUrl embedUrl category relatedArtist featured status
- **Media** — url publicId folder width height bytes format tags uploadedBy uploadedAt title alt createdAt
- **SiteSettings** (singleton) — siteName tagline shortDescription logoUrl faviconUrl contact emails phone whatsapp social social social URLs siteUrl SEO defaults newsletter name/description
- **AdminUser** — email name passwordHash role (superadmin/editor)
- **Subscriber Inquiry Submission Service** — as existing

---

## 7. DATA ACCESS LAYER (`lib/posts.ts`)

Public reads go through `lib/posts.ts`, which uses published MongoDB/lean) with Mongoose models filtered `find({ status: "PUBLISHED" })`. Fallback behaviour when Mongo unavailable → all queries return safe empty states and pages show gracefully. JSON files in `data/` are reference/input for `scripts/migrate.ts` and no longer drive public pages.

```
getPosts / getFeaturedPost / getPostsByPriority / getPostsByCategory /
getLatestPosts / getPostBySlug / getPostsByContentFormat / getTrendingPosts / getDiscoverPosts / getSearchDocuments / getCategoryMeta /
getPlaylists / getServices / getServiceBySlug / getEvents / getArtists / getFeaturedArtists / getArtistBySlug / getVideos / getPublicSiteConfig / getSiteSettings
```

---

## 8. CMS IMPLEMENTATION

### Authentication
- Edge `middleware.ts` gate for `/admin/*` and `/api/admin/*` verifies JWT before the route executes
- Additional `requireSession()` called first in every protected server component / server action / route handler
- Cookie `kk_admin_session` 604 800s httpOnly sameSite=lax secure=prod, JWT payload `{userId email name role superadmin/editor}

### Admin Pages

- **Dashboard** counts + recent content
- **Content (Stories)**: list search category/status filters edit delete publish toggle
- **Artists / Playlists / Events / Videos / Services**: each has list + new + edit via `CrudForm.tsx` extended with `type:image` → MediaSelector 5 modes
- **Media Library**: paginated (24/page newest first + search tags + Prev/Next
- **Inboxes**: inquiries submissions newsletter lists + detail views
- **Settings**: logo/favicon/default social images now use MediaSelector instead of URL text paste

### Server Actions

`lib/actions/*.ts` with `use server; zod validation; `next/cache revalidatePath + redirect

---

## 9. MEDIA SYSTEM (5 MODES)

Core workflow preserved: `Computer upload → Cloudinary → MongoDB Media → Media Library`

### 1 Computer upload (/api/upload/route.ts) + existing working uploader
- JPG/PNG/WEBP/GIF ≤10 MB; optional comma-separated `tags` field; multipart form;
- `requireSession → Cloudinary upload_stream via singleton `lib/cloudinary.ts`; MongoDB Media metadata + tags + dimensions/bytes/format/uploadedBy
- Cloudinary folder `kaboomklub`; thumbnail transform `c_fill,w_480,h_320

### 2 Media Library choose (app/admin/media + `app/api/media/route.ts
- Paginated: page + q search newest-first limit cap 100)
- Prev/Next pagination links; "Showing X–Y of Z; tags card caption
- Media card thumbnail URLs

### 3 Import from Internet `app/api/media/import/route.ts server action `importFromUrlAction`
- Require session → parse URL http/https only; validate; `isPrivateHost` blocks RFC1918/loopback/localhost/.local/.internal/CGNAT/IPv6 ::1/ULA/link-local → 20MB size limit; post-upload size cleanup destroy when exceeded; Cloudinary url upload; Media record; revalidate /admin/media; ext allowlist; mime check

### 4 External URL
- MediaSelector mode: editor pastes URL + preview; rendered with unoptimized next/image because external; external URLs never hit Next/image whitelist only allows Cloudinary only; `PublicImage unoptimized for nonCloudinary

### 5 No Image
- Schemas + actions zod defaults use image/thumbnail=""
- PublicImage renders local fallback at display time (logo fallback never in DB never forces unless hideFallback true renders null)

### MediaSelector (`components/admin/MediaSelector.tsx
5-mode client component):
Library browse select/confirm/preview/clear, Upload with tags, Import URL with tags, External URL with preview/Use as external, Clear/No Image. Writes `<input type="hidden" name={name}>` for FormData; compatible with existing server actions (action signatures unchanged). Works with: Stories featured & social, Artist image / Event image / Playlist cover / Video thumbnail / Site settings logo favicon default social

### Media Deletion Security (Phase 2 fix)
- `deleteMediaAction: requireSession → load → verify ownership/role → if uploadedBy empty not bypass only superadmin only allowed orphan destroy Cloudinary destroy try/catch; delete DB record; revalidate

---

## 10. DESIGN SYSTEM

Colors globals.css

```
--kk-bg        #f7f3ea   warm cream
--kk-bg-alt    #efe6d7
--kk-fg        #17120c   deep brown-black
--kk-red        #b3241b   MUSIC accent
--kk-gold       #f2c14e   CULTURE accent
--kk-green      #1a8f6e   BUSINESS
--kk-purple     #7c3aed ENTERTAINMENT
--kk-orange     #e85d04 FEATURES
--kk-dark        #080b10 hero bg
```

Typography: Inter; headlines black uppercase tight tracking; labels 10px font-black uppercase 0.25em tracking; body regular/medium relaxed leading. Utility classes `kk-label/section-title/headline/trending-scroll/newsletter-input` etc.

---

## 11. COMMERCIAL ARCHITECTURE

10 services no prices → contact inquiry; services `/contact?service=… Advertise `/advertise`; Submit `/submit` music/press/artist spot etc. CTA: Get A Quote / Request This / Book / Work / Partner / Proposal / Submit Music. Pricing language: "Pricing is tailored to the scope of each project."

---

## 12. SEO & DISCOVERABILITY

- Metadata title template description + metadataBase + OG/Twitter/keywords already implemented; dynamic `generateMetadata` for story artist; story generateMetadata per-post;

- **sitemap.xml** `app/sitemap.ts` all 19 static + 5 category + published stories & artists + playlists events videos; lastmod freq/priority
- **robots.txt** `app/robots.ts allow / disallow admin; Sitemap: host
- **JSON-LD**:
  - Organization (layout: name url logo description social links in head
  - Website + SearchAction target /search?q= home
  - NewsArticle (story page: headline description image author datePublished dateModified publisher keywords
  - EventList (events page: ItemList Event
- **alt default alt text; canonical via alt="" fallback;
- heading hierarchies semantic HTML
- **URL** clean semantic
- category pages independently discoverable;

---

## 13. ANALYTICS

GA4 conditional. Root layout app/layout.tsx injects `<Script strategy="afterInteractive"` afterInteractive:
```
if NEXT_PUBLIC_GA_MEASUREMENT_ID set:
- gtag src from googletagmanager + init anonymize_ip true

If env not not loaded.
```

Lightweight no packages; no duplicate systems existing analytics added.

---

## 14. SECURITY

- **Secrets: Cloudinary API secret MongoDB credentials server-side; never browser; env vars only.
- **Admin delete auth ordering requireSession BEFORE CDN calls. Empty uploadedBy does NOT allow arbitrary deletes; only superadmin manages orphan media ownership bypass ownership check runs CDN calls.
- **Upload validation file ext/mime/size before Cloudinary.
- **Import SSRF guard protocol private host; probe declared size check; actual size destroy if exceeded; no private network blocked.
- **External URLs unoptimized next/image**; prevent crashes caused whitelist only.
- **Zod server validation server action input before Mongo writes.
- **middleware edge route gate + requireSession application double layer.
- **Error messages no stack secrets/logs secrets; try/catch DB safely public pages empty states.

---

## 15. PERFORMANCE

- **Media Library pagination 24/page newest-first; unbounded queries eliminated
- **Cloudinary thumbnail transforms c_fill w480 h320
- PublicImage sizes default next/image Cloudinary CDN allowlist; lazy loading unless priority
- **External URLs unoptimized=true avoid optimizer allowlist
- Inter font-display swap
- cacheComponents + Suspense boundaries Next 16
- Server components default; minimal client only MediaSelector SearchClient Navbar Footer

---

## 16. DEPLOYMENT

- **Vercel Next.js project auto-deploy GitHub main
- **MongoDB Atlas MONGODB_URI
- **Cloudinary v2 CLOUDINARY_CLOUD_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET
- **Env vars**:
  MONGODB_URI
  CLOUDINARY_CLOUD_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET
  SESSION_SECRET JWT signing secret (min 32 chars)
  NEXT_PUBLIC_GA_MEASUREMENT_ID optional
  NODE_ENV production Vercel
  site url public site URL
- **next.config.ts remotePatterns { protocol https hostname res.cloudinary.com

---

## 17. ENVIRONMENT VARIABLES

Copy `.env.local.example` to `.env.local`. Never commit real values.

| Variable | Required | Where used |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB Atlas connection lib/db.ts |
| `CLOUDINARY_CLOUD_NAME` | Yes | Upload/Import/Media deletion |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary signing |
| `CLOUDINARY_API_SECRET` | Yes | Server-only NEVER client |
| `SESSION_SECRET` | Yes | JWT admin session signing min 32 chars |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 if present enable analytics |
| `NODE_ENV` | Vercel auto | `production` on Vercel |

---

## 18. ACCESSIBILITY

Semantic HTML heading hierarchy alt text labels focus states form labels links semantic nav keyboard accessible accessible

---

## 19. KNOWN LIMITATIONS

- Real photography placeholder logo fallback still used in DB image="" if editors save without image; PublicImage fallback logo fallback rendered only at render time.
- Seed artist/event/playlist/video counts depend seed content grows production.
- Forms server newsletter integrate ESP integration required live emails (form integrations optional not scope
- Search client query adequate current scale; scale upgrade necessary future.
- Font next/font/google internet build first required connectivity connection needed fonts available.

---

## 20. LAUNCH CHECKLIST

Before launch verify:

- [x] TypeScript tsc --noEmit clean
- [x] Production npm run build clean
- [x] Media upload Cloudinary Media Library paginated
- [x] 5-mode MediaSelector integrated forms
- [x] Internet import SSRF guarded
- [x] External URLs unoptimized safe rendering
- [x] No Image empty DB actions
- [x] Media delete auth correct superadmin orphan
- [x] Videos revalidate /videos not /video
- [x] Post delete story/category revalidated
- [x] sitemap.xml /robots.txt SEO files
- [x] JSON-LD 4 schemas Organization/Website/NewsArticle/EventList
- [x] GA4 conditional NEXT_PUBLIC_GA_MEASUREMENT_ID
- [x] Next/Image Cloudinary allowlist only safe external
- [x] Env vars secrets server no client bundles
- [x] Git tracked clean secrets .gitignore
- [ ] Vercel env configured
- [ ] MongoDB Atlas network/IP configured
- [ ] Cloudinary env vars
- [x] PROJECT_BIBLE up to date
- [ ] Browser smoke tests: home / categories / stories / story / artists / playlists / videos / events / search / forms / admin login+upload

---

*Last updated: 2026-09-09*

*Status: Production build passing. tsc clean. Platform complete & launch ready.*
*Framework: Next.js 16.2.6 App Router (Turbopack)
