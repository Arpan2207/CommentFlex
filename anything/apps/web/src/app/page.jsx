"use client";

import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Image as ImageIcon,
  Instagram,
  MessageSquare,
  Share2,
  ShieldCheck,
  Trophy,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="text-white" size={18} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            CommentFlex
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Enterprise
          </a>
          <div className="h-4 w-[1px] bg-gray-200" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-24 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 rounded-full px-3 py-1.5 text-sm font-medium mb-8">
          <ShieldCheck size={14} />
          Verified Mode Now Active
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-6">
          Show off your top comment flexes.
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          CommentFlex helps you import real comment like counts and generate
          story-ready receipts. The Strava for your social commentary.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-sm text-base font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2">
            <Instagram size={20} />
            Connect Instagram
          </button>
          <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-sm text-base font-semibold hover:border-gray-300 transition-colors">
            View Sample Profile
          </button>
        </div>
      </header>

      {/* Stats/Social Proof */}
      <section className="border-y border-gray-200 bg-gray-50/50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">12.4M</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              Likes Tracked
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">450K</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              Receipts Shared
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">15K+</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              10K Club Members
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">100%</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
              Verified Data
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Built for the high-res social era.
          </h2>
          <p className="text-gray-500 mt-2">
            Technical clarity for your social growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
              <Share2 className="text-gray-900" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Comment Receipts
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Auto-generated 1080x1920 cards designed strictly for Instagram
              Stories.
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> 4K resolution
                exports
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Custom badge
                overlays
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Growth percentage
                metrics
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
              <ShieldCheck className="text-gray-900" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Verified Mode
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Direct API connection to ensure every like is authenticated and
              tamper-proof.
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Read-only IG
                connection
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Hall of Fame badge
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Milestone
                automation
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
              <Trophy className="text-gray-900" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Friends League
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Compete on weekly leaderboards for the most comment traction in
              your circle.
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Private group
                invites
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Weekly winner
                receipts
              </li>
              <li className="text-sm text-gray-600 flex items-center">
                <span className="text-gray-400 mr-2">-</span> Real-time rank
                shifts
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Link-in-Bio Preview */}
      <section className="bg-gray-50 border-t border-gray-200 py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 inline-flex items-center gap-1.5 mb-6">
              <BarChart3 size={12} />
              Public Profiles
            </div>
            <h2 className="text-4xl font-semibold text-gray-900 tracking-tight mb-6">
              Your social proof, centralized.
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              A high-fidelity public profile that showcases your top-performing
              comments, badges, and league rankings. Perfect for your
              link-in-bio.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-100"
                    alt="User"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                +1,200 users joined today
              </span>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 w-full max-w-[320px] mx-auto transform rotate-2">
              <div className="text-center mb-8">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border border-gray-200 p-1"
                  alt="Profile"
                />
                <h4 className="text-xl font-semibold text-gray-900">
                  Alex Flex
                </h4>
                <p className="text-sm text-gray-500">@alex_ig</p>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-900">
                      Top Comment
                    </span>
                    <span className="text-xs text-blue-600 font-medium">
                      12.4K Likes
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600 line-clamp-2">
                    "This is literally the best thing I have seen all week.
                    Period."
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-900">
                      Friends League
                    </span>
                    <span className="text-xs text-orange-600 font-medium">
                      Rank #1
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-600">
                    32.1K total likes this week
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative ghost border elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-gray-100 rounded-full -z-10" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-gray-100 rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <MessageSquare size={16} />
            <span className="text-sm font-semibold">CommentFlex</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              API Documentation
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 CommentFlex. Standardized Social Proof.
          </div>
        </div>
      </footer>
    </div>
  );
}
