import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/dashboard";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Published Stories", value: stats.publishedPosts, color: "text-green-400", href: "/admin/content" },
    { label: "Draft Stories", value: stats.draftPosts, color: "text-yellow-400", href: "/admin/content" },
    { label: "Artists", value: stats.totalArtists, color: "text-blue-400", href: "/admin/artists" },
    { label: "Playlists", value: stats.totalPlaylists, color: "text-purple-400", href: "/admin/playlists" },
    { label: "Events", value: stats.totalEvents, color: "text-orange-400", href: "/admin/events" },
    { label: "Videos", value: stats.totalVideos, color: "text-pink-400", href: "/admin/videos" },
    { label: "Services", value: stats.totalServices, color: "text-cyan-400", href: "/admin/services" },
    { label: "Newsletter Subscribers", value: stats.totalSubscribers, color: "text-emerald-400", href: "/admin/newsletter" },
    { label: "New Inquiries", value: stats.newInquiries, color: "text-red-400", href: "/admin/inquiries" },
    { label: "New Submissions", value: stats.newSubmissions, color: "text-indigo-400", href: "/admin/submissions" },
  ];

  const quickActions = [
    { label: "New Story", href: "/admin/content/new", icon: "✎" },
    { label: "Add Artist", href: "/admin/artists/new", icon: "♪" },
    { label: "Add Playlist", href: "/admin/playlists/new", icon: "▶" },
    { label: "Add Event", href: "/admin/events/new", icon: "◈" },
    { label: "Upload Media", href: "/admin/media", icon: "⬡" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-white/40">
          Welcome to the KaboomKlub admin portal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-white/10 bg-[#111111] p-6 transition-colors hover:border-white/20"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              {card.label}
            </p>
            <p className={`mt-2 text-3xl font-black ${card.color}`}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-white">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#111111] px-5 py-4 transition-colors hover:border-[#b3241b] hover:bg-[#b3241b]/10"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-white">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Content */}
      <div>
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-white">
          Recent Stories
        </h2>
        <div className="rounded-lg border border-white/10 bg-[#111111]">
          {stats.recentPosts.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-white/30">
              No stories yet. Create your first story to get started.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {stats.recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/content/${post.id}`}
                  className="block px-6 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {post.title}
                      </p>
                      <p className="mt-1 text-[10px] text-white/40">
                        {post.category} • Updated {new Date(post.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] ${
                        post.status === "PUBLISHED"
                          ? "bg-green-900/60 text-green-300"
                          : post.status === "DRAFT"
                          ? "bg-yellow-900/60 text-yellow-300"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}