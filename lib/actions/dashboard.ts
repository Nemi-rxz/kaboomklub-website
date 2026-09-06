"use server";

import { connectDB } from "@/lib/db";
import { PostModel } from "@/lib/models/Post";
import { ArtistModel } from "@/lib/models/Artist";
import { PlaylistModel } from "@/lib/models/Playlist";
import { EventModel } from "@/lib/models/Event";
import { VideoModel } from "@/lib/models/Video";
import { ServiceModel } from "@/lib/models/Service";
import { SubscriberModel } from "@/lib/models/Subscriber";
import { InquiryModel } from "@/lib/models/Inquiry";
import { SubmissionModel } from "@/lib/models/Submission";
import { requireSession } from "@/lib/session";

export interface DashboardStats {
  publishedPosts: number;
  draftPosts: number;
  archivedPosts: number;
  totalArtists: number;
  totalPlaylists: number;
  totalEvents: number;
  totalVideos: number;
  totalServices: number;
  totalSubscribers: number;
  newInquiries: number;
  newSubmissions: number;
  recentPosts: Array<{
    id: string;
    title: string;
    category: string;
    status: string;
    updatedAt: Date;
  }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireSession();
  await connectDB();

  const [
    publishedPosts,
    draftPosts,
    archivedPosts,
    totalArtists,
    totalPlaylists,
    totalEvents,
    totalVideos,
    totalServices,
    totalSubscribers,
    newInquiries,
    newSubmissions,
    recentPosts,
  ] = await Promise.all([
    PostModel.countDocuments({ status: "PUBLISHED" }),
    PostModel.countDocuments({ status: "DRAFT" }),
    PostModel.countDocuments({ status: "ARCHIVED" }),
    ArtistModel.countDocuments({ status: "PUBLISHED" }),
    PlaylistModel.countDocuments({ status: "PUBLISHED" }),
    EventModel.countDocuments({ status: "PUBLISHED" }),
    VideoModel.countDocuments({ status: "PUBLISHED" }),
    ServiceModel.countDocuments({ status: "PUBLISHED" }),
    SubscriberModel.countDocuments({ status: "ACTIVE" }),
    InquiryModel.countDocuments({ status: "NEW" }),
    SubmissionModel.countDocuments({ status: "NEW" }),
    PostModel.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("_id title category status updatedAt")
      .lean(),
  ]);

  return {
    publishedPosts,
    draftPosts,
    archivedPosts,
    totalArtists,
    totalPlaylists,
    totalEvents,
    totalVideos,
    totalServices,
    totalSubscribers,
    newInquiries,
    newSubmissions,
    recentPosts: recentPosts.map((post) => ({
      id: String(post._id),
      title: post.title,
      category: post.category,
      status: post.status,
      updatedAt: post.updatedAt,
    })),
  };
}