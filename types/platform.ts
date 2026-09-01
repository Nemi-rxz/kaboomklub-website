export interface Playlist {
  id: string;
  slug: string;
  title: string;
  description: string;
  platform: string;
  href: string;
  image: string;
  cadence: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: string;
  deliverables: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface EventItem {
  id: string;
  slug: string;
  name: string;
  date: string;
  location: string;
  description: string;
  artists: string[];
  organizer: string;
  href: string;
  image: string;
}

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: string;
  deadline: string;
  location: string;
  description: string;
  href: string;
  status: "OPEN" | "CLOSING SOON" | "CLOSED";
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  genre: string;
  location: string;
  image: string;
  latestRelease?: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  tags: string[];
  featured: boolean;
}
