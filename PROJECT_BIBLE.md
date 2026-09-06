# KABOOMKLUB PROJECT BIBLE

> The source of truth for the Kaboomklub website project — existing structure, new direction, implementation decisions, and development status.

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
**Collaboration:** Kaboomklub × 9JA Lifestyle partnership retained where relevant.

---

## 2. STRATEGIC DIRECTION

### Social Media vs Website

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

| Item | Version |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| React | 19.2.4 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| CMS | MongoDB / Mongoose admin CMS and public content source; JSON files retained for migration/reference |
| Fonts | Inter (via next/font/google) |
| Deployment | Vercel |

**Key Next.js 16 conventions used:**
- All page `params` are `Promise<{...}>` — must be `await`-ed
- `PageProps<'/route/[slug]'>` helper type available globally
- `use cache` directive available for caching (not used — flat-file data is already static)
- `cacheComponents: true` in `next.config.ts`
- All components are Server Components by default — Client Components require `'use client'` directive

---

## 4. FOLDER STRUCTURE

```
kaboomklub-app/
├── app/
│   ├── layout.tsx                  # Root layout (metadata, Inter font)
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Tailwind v4 + design tokens
│   ├── favicon.ico
│   ├── stories/page.tsx            # All stories archive
│   ├── story/[slug]/page.tsx       # Individual story page (renders body[])
│   ├── category/[slug]/page.tsx    # Category listing page
│   ├── music/page.tsx              # Music section
│   ├── entertainment/page.tsx      # Entertainment section
│   ├── culture/page.tsx            # Culture section
│   ├── business/page.tsx           # Business section
│   ├── features/page.tsx           # Features section
│   ├── playlists/page.tsx          # Playlists
│   ├── artists/
│   │   ├── page.tsx                # Artists listing
│   │   └── [slug]/page.tsx         # Artist profile
│   ├── events/page.tsx             # Events
│   ├── video/page.tsx              # Video / Multimedia
│   ├── services/page.tsx           # Services (no prices)
│   ├── advertise/page.tsx          # Advertise / Partner
│   ├── submit/page.tsx             # Submissions
│   ├── contact/page.tsx            # Contact / Inquiry form
│   ├── newsletter/page.tsx         # The Kaboomklub Brief signup
│   ├── about/page.tsx              # About + Media Kit
│   └── search/page.tsx             # Search
├── components/
│   ├── EditorialNavbar.tsx         # Main navigation (all categories + mobile)
│   ├── EditorialFooter.tsx         # Full footer (Fish Art X, social links)
│   ├── MajorHeadline.tsx           # Featured story hero component
│   └── PostCard.tsx                # Story card (vertical & horizontal)
├── lib/
│   └── posts.ts                    # Data access layer + siteConfig + nav
├── data/
│   ├── posts.json                  # 15 editorial posts
│   ├── services.json               # 10 services (no prices)
│   ├── playlists.json              # 3 playlists
│   ├── events.json                 # 2 events
│   ├── opportunities.json          # 3 opportunities
│   └── artists.json                # 3 artists
├── types/
│   ├── blog.ts                     # Post interface + types
│   └── platform.ts                 # Playlist, Service, EventItem, Opportunity, Artist
├── public/
│   ├── kaboom-logo.jpg
│   └── bat.jpg
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 5. ROUTES

| Route | Status | Description |
|---|---|---|
| `/` | ✅ Live | Editorial media homepage |
| `/stories` | ✅ Live | All stories archive |
| `/story/[slug]` | ✅ Live | Individual story (renders body[]) |
| `/category/[slug]` | ✅ Live | Category listing |
| `/music` | ✅ Live | Music section page |
| `/entertainment` | ✅ Live | Entertainment section page |
| `/culture` | ✅ Live | Culture section page |
| `/business` | ✅ Live | Business section page |
| `/features` | ✅ Live | Features section page |
| `/playlists` | ✅ Live | Playlists page |
| `/artists` | ✅ Live | Artists listing |
| `/artists/[slug]` | ✅ Live | Individual artist profile |
| `/events` | ✅ Live | Events page |
| `/video` | ✅ Live | Video / multimedia |
| `/services` | ✅ Live | Services (professional, no prices) |
| `/advertise` | ✅ Live | Advertise / Partner page |
| `/submit` | ✅ Live | Submissions page |
| `/contact` | ✅ Live | Contact / Inquiry |
| `/newsletter` | ✅ Live | The Kaboomklub Brief |
| `/about` | ✅ Live | About + Media Kit |
| `/search` | ✅ Live | Search |

---

## 6. CONTENT ARCHITECTURE

### Primary Content Pillars

1. **MUSIC** — `#b3241b` red — Music news, new releases, artist stories, Afrobeats, discovery, music business
2. **ENTERTAINMENT** — `#7c3aed` purple — Nollywood, film, TV, streaming, pop culture, events, concerts
3. **CULTURE** — `#f2c14e` gold — African culture, fashion, lifestyle, youth culture, digital trends
4. **BUSINESS** — `#1a8f6e` green — Music business, creative economy, startups, tech, creator economy
5. **FEATURES** — `#e85d04` orange — Original editorial: interviews, spotlights, explainers, deep dives

### Content Formats (Original Media Franchises)

| Format | Description |
|---|---|
| Kaboomklub Interviews | Conversations with artists, creatives, executives |
| Artist Spotlight | Dedicated artist features |
| Kaboomklub Explains | Accessible explainers on music, business, tech, culture |
| The Business of Music | Recurring series on music economics and industry |
| Culture Watch | Emerging cultural movements and trends |
| Industry Watch | Entertainment and media industry analysis |
| Kaboomklub Reviews | Music, film, and entertainment reviews |
| Deep Dive | Long-form journalism and analysis |
| Kaboomklub Sessions | Performance and session content |

### Post Data Model (`types/blog.ts`)

```typescript
interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  category: "MUSIC" | "ENTERTAINMENT" | "CULTURE" | "BUSINESS" | "FEATURES"
  subcategory: string
  contentFormat?: "News" | "Feature" | "Interview" | "Artist Spotlight" | "Review" |
    "Explainer" | "Deep Dive" | "Industry Watch" | "Culture Watch" |
    "The Business of Music" | "Opinion" | "Roundup" | "Profile"
  categoryColor: string
  author: string
  authorRole: string
  date: string
  updatedDate: string
  readTime: string
  image: string
  imageCaption: string
  priority: "MAJOR" | "SECONDARY" | "SIDEBAR"
  featured: boolean  // only one post should have featured: true
  tags: string[]
  body: string[]     // array of paragraphs rendered in story page
  seoTitle: string
  seoDescription: string
  socialImage: string
}
```

### Artist Data Model (`types/platform.ts`)

```typescript
interface Artist {
  id: string
  slug: string
  name: string
  bio: string
  genre: string
  location: string
  image: string
  latestRelease?: string
  socialLinks: { instagram?, spotify?, youtube?, twitter?, tiktok? }
  tags: string[]
  featured: boolean
}
```

---

## 7. DATA ACCESS LAYER (`lib/posts.ts`)

All data access is synchronous — flat-file JSON imported at build time.

### Exports

**Config:**
- `siteConfig` — name, tagline, handle, baseUrl, newsletterName, newsletterDescription, mission, companyNote
- `mainNav` — navigation items array
- `categories` — 5 categories with slug, label, color, description
- `socialLinks` — Instagram, TikTok, X, YouTube, Spotify

**Post functions:** `getPosts`, `getFeaturedPost`, `getPostsByPriority`, `getPostsByCategory`, `getLatestPosts`, `getPostBySlug`, `getCategoryMeta`, `getPostsByContentFormat`, `getTrendingPosts`, `getDiscoverPosts`, `getSearchDocuments`

**Platform functions:** `getPlaylists`, `getServices`, `getServiceBySlug`, `getEvents`, `getOpportunities`, `getArtists`, `getFeaturedArtists`, `getArtistBySlug`

---

## 8. DESIGN SYSTEM

### Color Tokens (`app/globals.css`)

```css
--kk-bg:           #f7f3ea     /* Warm cream — main background */
--kk-bg-alt:       #efe6d7     /* Darker cream — section backgrounds */
--kk-fg:           #17120c     /* Deep brown-black — primary text */
--kk-fg-muted:     #5c4933     /* Secondary text */
--kk-red:          #b3241b     /* Primary accent — MUSIC category */
--kk-gold:         #f2c14e     /* Secondary accent — CULTURE category */
--kk-green:        #1a8f6e     /* BUSINESS category */
--kk-purple:       #7c3aed     /* ENTERTAINMENT category */
--kk-orange:       #e85d04     /* FEATURES category */
--kk-dark:         #080b10     /* Hero section background */
--kk-dark-card:    #121821     /* Dark card background */
--kk-white:        #f7f3ea     /* Light text on dark backgrounds */
```

### Category Color Classes (in globals.css)

- `.cat-music` / `.cat-music-bg` → `#b3241b`
- `.cat-entertainment` / `.cat-entertainment-bg` → `#7c3aed`
- `.cat-culture` / `.cat-culture-bg` → `#f2c14e`
- `.cat-business` / `.cat-business-bg` → `#1a8f6e`
- `.cat-features` / `.cat-features-bg` → `#e85d04`

### Typography

- **Font:** Inter (loaded via `next/font/google`)
- **Headlines:** Black weight (900), uppercase, tight tracking (`tracking-tight` or `-0.02em`)

## 9. ADMIN CMS IMPLEMENTATION

### Admin Routes

- `/admin/login` — authenticated admin login.
- `/admin` — live dashboard counts for stories, artists, playlists, events, videos, subscribers, inquiries, and submissions, plus recent content and quick actions.
- `/admin/content` — MongoDB post table with search, category/status filters, edit, delete, publish, and unpublish actions.
- `/admin/content/new` — create story form.
- `/admin/content/[id]` — edit, publish, unpublish/archive, SEO, tags, category, format, priority, author, and featured-image fields.
- `/admin/media` — MongoDB media library with upload, search, preview, and delete.

### Authentication and Data

Admin pages and server actions use the existing HTTP-only JWT session and `requireSession()`. Public contact, newsletter, and submission forms use `contactFormAction`, `newsletterSubscribeAction`, and `submitFormAction` with Zod validation and MongoDB persistence. Post, inquiry, submission, subscriber, and media records use Mongoose models in `lib/models`.

### Media System

`/api/upload` requires an admin session, accepts only JPG/PNG/WEBP/GIF images up to 10 MB, uploads through Cloudinary using server-only credentials, stores the returned metadata in `MediaModel`, and returns usable URLs. Cloudinary deletion is performed by the media server action where configured.

### Remaining Work

- Public content routes now read published MongoDB records through `lib/posts.ts`; drafts and archived records are excluded from public queries.
- The public data layer maps existing Post, Artist, Playlist, Event, Service, Video, and SiteSettings models into the existing public types and page props.
- Admin publishing updates MongoDB, and public pages use request-time reads with Next.js 16 Suspense/cache-components boundaries rather than build-time JSON snapshots.
- Public reads fail closed when MongoDB is unavailable: collection pages render empty states and single-record routes resolve as not found; no connection errors or secrets are sent to clients.
- `data/posts.json`, `data/artists.json`, `data/playlists.json`, `data/events.json`, and `data/services.json` are no longer used by public pages. They remain used by `scripts/migrate.ts` as migration/reference input. `data/opportunities.json` is also retained; the current advertising page uses its own local opportunity copy because no Opportunity MongoDB model exists.
- The major admin CRUD screens are complete for artists, playlists, events, videos, and services, with MongoDB-backed lists, search, forms, editing, and deletion.
- Submissions and inquiries now have MongoDB-backed inbox lists, detail views, and protected status updates.
- Newsletter administration includes subscriber search and status display; `/api/unsubscribe` validates the existing token and persists `UNSUBSCRIBED`.
- Site settings now load and save the supported `SiteSettings` singleton fields.
- Cloudinary credentials and MongoDB connection variables must be configured in the deployment environment before live persistence or uploads can run.
- Existing JSON data files remain in place and have not been removed.
- **Labels:** 10px, Black weight, uppercase, wide tracking (`0.25em`)
- **Body:** Regular/Medium, `text-base` / `text-lg`, relaxed leading

### Utility Classes

- `.kk-label` — 10px, 900 weight, uppercase, 0.25em tracking
- `.kk-section-title` — clamp(1.75rem, 4vw, 3.5rem), 900 weight, uppercase
- `.kk-headline` — clamp(2rem, 5vw, 4.5rem), 900 weight, uppercase
- `.line-clamp-2` / `.line-clamp-3` — text truncation
- `.newsletter-input` — styled placeholder for newsletter inputs
- `.trending-scroll` — hidden scrollbar for horizontal scroll strips
- `.animate-fade-in-up` / `.animate-slide-in-left` / `.animate-pulse-subtle`

---

## 9. COMMERCIAL ARCHITECTURE

### Services (10 services, no prices)

All services direct to inquiry forms — no fixed pricing displayed publicly.

1. Brand Design & Identity → `/contact?service=brand-design`
2. Promotional Content Design → `/contact?service=promo-design`
3. Digital Campaign Management → `/contact?service=digital-campaigns`
4. Landing Page / Website Design → `/contact?service=website-design`
5. Playlist Pitching → `/submit`
6. Press Release / Announcement → `/contact?service=press-release`
7. Artist Spotlight & Features → `/contact?service=artist-spotlight`
8. Collaborations → `/contact?service=collaborations`
9. Sponsored Ads → `/advertise`
10. Audience Growth Strategy → `/contact?service=growth-strategy`

**CTA language used:** "Get A Quote", "Request This Service", "Book A Service", "Work With Kaboomklub", "Partner With Us", "Request A Proposal", "Submit Music"

**Pricing language:** "Pricing is tailored to the scope and requirements of each project." / "Contact us to discuss your campaign and receive a tailored proposal."

### Advertise / Partner Page (`/advertise`)

Targets brands, record labels, PR agencies, entertainment companies. Shows advertising/partnership opportunities — no fixed rates. CTA: "Request A Media Proposal" → `/contact?type=advertise`.

### Submissions (`/submit`)

Allows artists, labels, PR agencies, brands, event organizers to submit music, press releases, artist announcements, events, news, interview requests, collaboration requests.

---

## 10. NEWSLETTER

**Name:** The Kaboomklub Brief

**Coverage:** Music, entertainment, culture, business, new artists, new music, industry stories.

**Purpose:** Direct audience ownership outside social media algorithms.

---

## 11. FISH ART X & 9JA LIFESTYLE

- **Fish Art X** — parent company. Mentioned in footer and about page only. Kaboomklub identity dominates.
- **9JA Lifestyle** — existing collaboration partner, referenced where relevant (footer, about).

---

## 12. NAVIGATION STRUCTURE

### Main Nav
Home | Music | Entertainment | Culture | Business | Features | Playlists | Artists | Events | Video

### Secondary/Footer Nav
Stories | About | Services | Advertise | Submit | Contact | Newsletter | Search

---

## 13. IMPLEMENTATION STATUS

### Completed ✅
- [x] PROJECT_BIBLE updated (this document)
- [x] `layout.tsx` — Inter font via next/font/google, metadata with OG/Twitter, keywords, metadataBase
- [x] `globals.css` — category pill hover classes added; font variable wired to --font-inter
- [x] `EditorialNavbar` — client component, 9 primary nav items, secondary strip, mobile hamburger menu, newsletter CTA, search icon
- [x] `EditorialFooter` — new categories, social links (Instagram/TikTok/X/YouTube/Spotify), Work With Us column, Fish Art X copyright
- [x] Homepage (`app/page.tsx`) — hero, trending strip, category nav, latest+sidebar, music section, artist discovery, features+business columns, newsletter band, services CTA
- [x] Story page — renders `body[]` paragraphs, SEO metadata, tags, content format badge, share links, related posts
- [x] Category page — large header with category colour accent, lead post, grid, category cross-links, `next/image` for lead
- [x] Stories archive — updated copy, CSS-only category filter pills, post count
- [x] `/music` — dark hero, MajorHeadline, grid, artist discovery, playlists strip, submit CTA
- [x] `/entertainment` — dark hero, MajorHeadline, grid, events CTA
- [x] `/culture` — dark hero, MajorHeadline, grid, Culture Watch promo
- [x] `/business` — dark hero, MajorHeadline, Business of Music series, grid, services CTA
- [x] `/features` — dark hero, MajorHeadline, Interviews section, Explains section, pitch CTA
- [x] `/playlists` — Spotify playlist cards, submit music CTA
- [x] `/artists` — artist cards (bio/genre/location/tags), discovery posts, submit/spotlight CTAs
- [x] `/artists/[slug]` — artist profile: bio, social links, KaboomKlub coverage, feature CTA
- [x] `/events` — event cards (date/location/artists/organizer), entertainment stories, host CTA
- [x] `/video` — YouTube/Instagram CTAs, interviews, features, video collaboration CTA
- [x] `/services` — 10 services (no prices), 4-step process, professional quote CTAs
- [x] `/advertise` — 9 opportunity types, Why KaboomKlub section, media kit + proposal CTAs
- [x] `/submit` — 6 submission types with editorial guidelines
- [x] `/contact` — full inquiry form (name/company/email/phone/service/budget/timeline/description)
- [x] `/newsletter` — The Kaboomklub Brief signup, coverage breakdown, sponsorship CTA
- [x] `/about` — mission, categories, 9 media formats, 7-platform ecosystem, Fish Art X + 9JA Lifestyle, media kit
- [x] `/search` — `SearchClient` (client component, live query + category filter) + server page

### Build Output (September 1, 2026)
- ✅ Compiled successfully (Turbopack)
- ✅ TypeScript — 0 errors (strict mode)
- ✅ 47 static/PPR pages generated — 0 build errors
- Routes: `/`, `/_not-found`, `/about`, `/advertise`, `/artists`, `/artists/[slug]` ×3, `/business`, `/category/[slug]` ×5, `/contact`, `/culture`, `/entertainment`, `/events`, `/features`, `/music`, `/newsletter`, `/playlists`, `/search`, `/services`, `/stories`, `/story/[slug]` ×15, `/submit`, `/video`

### Known Limitations / Future Work
- Images: Only 2 real images in `/public/`. All non-featured posts use logo as placeholder. Real photography needed.
- Body content: Posts have 3-paragraph body arrays. Real editorial content needed.
- Newsletter: Form submits to placeholder — needs backend (e.g. Mailchimp, ConvertKit) integration.
- Contact/Submit forms: Static UI — needs backend or form service (e.g. Formspree, Resend) integration.
- Search: Client-side in-memory search — adequate for current scale. May need Algolia/Typesense at scale.
- Artist profiles: 3 seed artists. Needs expansion into full database.
- Events: 2 seed events. Needs regular updates.
- Video: Placeholder structure — needs real YouTube/video embed integration.
- Font: Loaded via next/font/google — requires internet on first build.

---

## 14. SEO & DISCOVERABILITY

- All pages have `metadata` exports with title, description
- Dynamic pages use `generateMetadata` for per-post/per-artist SEO
- All story pages have `seoTitle` and `seoDescription` fields
- `generateStaticParams` used on all dynamic routes for static generation
- URL structure: clean, semantic slugs throughout
- Category pages are independently discoverable
- Artist profile pages are independently discoverable

---

## 15. FUTURE EXPANSION READINESS

The architecture supports future addition of:
- Podcasts section
- Original video shows
- Awards / Kaboomklub recognitions
- Community features
- Digital publications / long-form PDF downloads
- Kaboomklub Sessions (live/performance content)
- Event ticketing integration
- Music streaming previews (embedded Spotify/Apple Music)
- Multi-author support (author profiles page)
- Tagging system improvements (tag index pages)

---

*Last updated: September 1, 2026*
*Status: Full implementation complete — production build passing, 47 pages, 0 errors*
*Framework: Next.js 16.2.6 App Router*
