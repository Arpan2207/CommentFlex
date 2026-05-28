"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  BadgeCheck,
  Pin,
  TrendingUp,
  Award,
  ExternalLink,
  Share2,
} from "lucide-react";

const MOCK_GROWTH = ["+2.1K today", "+842 today", "+310 today", "+198 today"];
const MOCK_RANKS = ["Top 1%", "Top 2%", "Top 5%", "Top 8%"];
const MOCK_CREATORS = ["Khaby Lame", "MrBeast", "Zach King", "Adin Ross"];
const MOCK_CREATOR_HANDLES = [
  "@khaby.lame",
  "@mrbeast",
  "@zachking",
  "@adinross",
];

function formatLikes(count) {
  if (!count) return "0";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toLocaleString();
}

export default function PublicProfile({ params }) {
  const { username } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await fetch(`/api/users/${username}`);
      if (!res.ok) throw new Error("Profile not found");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center font-['Inter']">
        <div
          className="text-[13px] text-white/30 tracking-wide"
          style={{ animation: "pulse 1.5s ease-in-out infinite" }}
        >
          Loading verified records...
        </div>
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center font-['Inter']">
        <div className="text-sm text-white/40">User not found.</div>
      </div>
    );

  const { user, comments } = data;
  const sorted = comments
    ? [...comments].sort((a, b) => b.like_count - a.like_count)
    : [];

  return (
    <div className="min-h-screen bg-[#F8F8FB] font-['Inter'] pb-24">
      {/* ── Dark Hero Header ── */}
      <div className="bg-[#0A0A14] relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-[-60px] left-[15%] right-[15%] h-[200px] rounded-full pointer-events-none"
          style={{ background: "rgba(75, 140, 247, 0.07)" }}
        />

        <div className="max-w-xl mx-auto px-6 pt-14 pb-12 text-center relative">
          {/* Avatar */}
          <div className="relative inline-block mb-5">
            <img
              src={
                user.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
              }
              className="w-20 h-20 rounded-full bg-[#1A1A2E]"
              alt={user.username}
            />
            {user.verified_mode && (
              <div className="absolute -bottom-1 -right-1 bg-[#4B8CF7] rounded-full p-1 border-2 border-[#0A0A14]">
                <BadgeCheck size={13} className="text-white" />
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
            {user.username}
          </h1>
          <p className="text-[13px] text-white/35 mb-6">@{user.ig_username}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-8">
            <div className="bg-white/5 rounded-xl py-3 px-3">
              <div className="text-xl font-semibold text-white tracking-tight">
                {formatLikes(user.total_likes_all_time)}
              </div>
              <div className="text-[9px] font-medium text-white/25 uppercase tracking-widest mt-1">
                Likes
              </div>
            </div>
            <div className="bg-white/5 rounded-xl py-3 px-3">
              <div className="text-xl font-semibold text-white tracking-tight">
                {user.total_likes_all_time >= 10000 ? "10K" : "Pro"}
              </div>
              <div className="text-[9px] font-medium text-white/25 uppercase tracking-widest mt-1">
                Club
              </div>
            </div>
            <div className="bg-white/5 rounded-xl py-3 px-3">
              <div className="text-xl font-semibold text-[#22D3A5] tracking-tight">
                #{sorted.length > 0 ? "1" : "—"}
              </div>
              <div className="text-[9px] font-medium text-white/25 uppercase tracking-widest mt-1">
                League
              </div>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 bg-[#4B8CF7]/10 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#4B8CF7] tracking-wider">
              <BadgeCheck size={11} />
              VERIFIED
            </div>
            {user.total_likes_all_time >= 10000 && (
              <div className="inline-flex items-center gap-1.5 bg-[#22D3A5]/10 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#22D3A5] tracking-wider">
                10K CLUB
              </div>
            )}
            <div className="inline-flex items-center gap-1.5 bg-white/6 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white/30 tracking-wider">
              {sorted.length} FLEXES
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="max-w-xl mx-auto px-5 py-8">
        {/* Section header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-widest">
            Top Flexes
          </h2>
          <span className="text-[11px] text-[#BCBCC6] font-medium">
            {sorted.length} records
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {sorted.map((comment, idx) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl p-6 hover:shadow-sm transition-shadow"
            >
              {/* Top row */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-2 flex-wrap">
                  {comment.is_top && (
                    <div className="inline-flex items-center gap-1 bg-amber-50 rounded-full px-2.5 py-1 text-[10px] font-semibold text-amber-600">
                      <Award size={10} />
                      Top Comment
                    </div>
                  )}
                  {comment.is_pinned && (
                    <div className="inline-flex items-center gap-1 bg-gray-50 rounded-full px-2.5 py-1 text-[10px] font-medium text-gray-500">
                      <Pin size={9} />
                      Pinned
                    </div>
                  )}
                  {comment.like_count >= 10000 && (
                    <div className="inline-flex items-center gap-1 bg-emerald-50 rounded-full px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                      10K Club
                    </div>
                  )}
                </div>

                {/* Like count */}
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                    {formatLikes(comment.like_count)}
                  </span>
                  <Heart size={15} className="text-red-500 fill-red-500" />
                </div>
              </div>

              {/* Comment body */}
              <div className="mb-5">
                {comment.is_gif ? (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    {comment.gif_url && (
                      <img
                        src={comment.gif_url}
                        className="w-14 h-14 rounded-lg object-cover"
                        alt="GIF"
                      />
                    )}
                    {!comment.gif_url && (
                      <div className="w-14 h-14 bg-gray-200 rounded-lg" />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        GIF Comment
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                        Visual Expression
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[15px] text-gray-700 leading-relaxed italic">
                    "{comment.content}"
                  </p>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex justify-between items-center pt-4"
                style={{ borderTop: "1px solid #F3F4F6" }}
              >
                {/* Creator + growth */}
                <div>
                  <div className="text-[11px] text-gray-400 font-medium">
                    on {MOCK_CREATORS[idx] || comment.post_title}
                    {MOCK_CREATOR_HANDLES[idx] && (
                      <span className="text-gray-300 ml-1">
                        {MOCK_CREATOR_HANDLES[idx]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={10} className="text-emerald-500" />
                      <span className="text-[11px] font-semibold text-emerald-600">
                        {MOCK_GROWTH[idx] || "+84 today"}
                      </span>
                    </div>
                    <span className="text-gray-300 text-[10px]">·</span>
                    <span className="text-[11px] font-medium text-gray-400">
                      {MOCK_RANKS[idx] || "Top 10%"}
                    </span>
                  </div>
                </div>

                {/* View receipt link */}
                <a
                  href={`/receipt/${comment.id}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4B8CF7] hover:text-blue-700 transition-colors"
                >
                  <ExternalLink size={11} />
                  View receipt
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#BCBCC6] font-medium">
            Verified by CommentFlex
          </div>
        </div>
      </main>
    </div>
  );
}
