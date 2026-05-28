import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Heart,
  Share2,
  BadgeCheck,
  TrendingUp,
  MessageCircle,
  Zap,
  Award,
  ExternalLink,
} from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const MOCK_GROWTH = ["+2.1K today", "+842 today", "+310 today", "+198 today"];
const MOCK_RANKS = ["Top 1%", "Top 2%", "Top 5%", "Top 8%"];
const MOCK_CREATORS = ["Khaby Lame", "MrBeast", "Zach King", "Adin Ross"];

function formatLikes(count) {
  if (!count) return "0";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const userId = 1;

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", userId],
    queryFn: async () => {
      const res = await fetch(`/api/comments?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const totalLikes = comments?.reduce((acc, c) => acc + c.like_count, 0) || 0;
  const topComment = comments?.sort((a, b) => b.like_count - a.like_count)[0];

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F8FB", paddingTop: insets.top }}
    >
      {/* ── Header ── */}
      <View
        style={{
          paddingHorizontal: 22,
          paddingTop: 16,
          paddingBottom: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#0A0A10",
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageCircle color="white" size={15} strokeWidth={2} />
          </View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Inter_600SemiBold",
              color: "#0A0A10",
              letterSpacing: -0.4,
            }}
          >
            CommentFlex
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "rgba(75, 140, 247, 0.1)",
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <BadgeCheck size={12} color="#4B8CF7" />
          <Text
            style={{
              color: "#4B8CF7",
              fontSize: 11,
              fontFamily: "Inter_600SemiBold",
              letterSpacing: 0.3,
            }}
          >
            Verified
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Stat Card ── */}
        <View style={{ paddingHorizontal: 18, marginTop: 4, marginBottom: 14 }}>
          <View
            style={{
              backgroundColor: "#0E0E1C",
              borderRadius: 24,
              overflow: "hidden",
              padding: 28,
            }}
          >
            {/* Ambient glow */}
            <View
              style={{
                position: "absolute",
                top: -30,
                left: "10%",
                right: "10%",
                height: 120,
                backgroundColor: "rgba(75, 140, 247, 0.1)",
                borderRadius: 999,
              }}
              pointerEvents="none"
            />

            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_500Medium",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 2.5,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Total Comment Likes
            </Text>

            <Text
              style={{
                fontSize: 72,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
                letterSpacing: -3,
                lineHeight: 68,
                includeFontPadding: false,
                marginBottom: 12,
              }}
            >
              {formatLikes(totalLikes)}
            </Text>

            {/* Growth + rank row */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 22,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "rgba(34, 211, 165, 0.1)",
                  borderRadius: 999,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <TrendingUp size={11} color="#22D3A5" />
                <Text
                  style={{
                    color: "#22D3A5",
                    fontSize: 12,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  +2.1K today
                </Text>
              </View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: 12,
                  fontFamily: "Inter_500Medium",
                }}
              >
                · Trending
              </Text>
            </View>

            {/* Bottom row: verified mode + league rank */}
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                paddingTop: 18,
                borderTopWidth: 1,
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: "#22D3A5",
                  }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_500Medium",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  Verified Mode Active
                </Text>
              </View>
              <Text style={{ color: "rgba(255,255,255,0.12)", fontSize: 11 }}>
                ·
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                #1 in League
              </Text>
            </View>
          </View>
        </View>

        {/* ── Milestone Alert ── */}
        <View style={{ paddingHorizontal: 18, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: "#0E0E1C",
              borderRadius: 18,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={18} color="#F59E0B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontFamily: "Inter_600SemiBold",
                  marginBottom: 2,
                }}
              >
                Your comment hit 10K likes 🎉
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontFamily: "Inter_400Regular",
                }}
              >
                Share your receipt before the moment fades.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                topComment && router.push(`/receipt/${topComment.id}`)
              }
              style={{
                backgroundColor: "#F59E0B",
                borderRadius: 999,
                paddingHorizontal: 14,
                paddingVertical: 7,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 12,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Top Comments ── */}
        <View style={{ paddingHorizontal: 18 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_600SemiBold",
                color: "#0A0A10",
                letterSpacing: -0.3,
              }}
            >
              Top Comments
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/gallery")}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Inter_500Medium",
                  color: "#4B8CF7",
                }}
              >
                Hall of Fame →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            {isLoading ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "#9CA3AF",
                  fontFamily: "Inter_400Regular",
                  paddingVertical: 20,
                  textAlign: "center",
                }}
              >
                Loading your flexes...
              </Text>
            ) : (
              comments
                ?.sort((a, b) => b.like_count - a.like_count)
                .map((comment, idx) => (
                  <TouchableOpacity
                    key={comment.id}
                    onPress={() => router.push(`/receipt/${comment.id}`)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 18,
                      padding: 18,
                    }}
                    activeOpacity={0.75}
                  >
                    {/* Top row: badges + number */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 14,
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 6 }}>
                        {comment.is_top && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 4,
                              backgroundColor: "rgba(245, 158, 11, 0.08)",
                              borderRadius: 999,
                              paddingHorizontal: 8,
                              paddingVertical: 3,
                            }}
                          >
                            <Award size={10} color="#F59E0B" />
                            <Text
                              style={{
                                color: "#F59E0B",
                                fontSize: 10,
                                fontFamily: "Inter_600SemiBold",
                              }}
                            >
                              Top
                            </Text>
                          </View>
                        )}
                        {comment.is_pinned && (
                          <View
                            style={{
                              backgroundColor: "#F3F4F6",
                              borderRadius: 999,
                              paddingHorizontal: 8,
                              paddingVertical: 3,
                            }}
                          >
                            <Text
                              style={{
                                color: "#6B7280",
                                fontSize: 10,
                                fontFamily: "Inter_600SemiBold",
                              }}
                            >
                              Pinned
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Like count */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontFamily: "Inter_600SemiBold",
                            color: "#0A0A10",
                            letterSpacing: -0.8,
                          }}
                        >
                          {formatLikes(comment.like_count)}
                        </Text>
                        <Heart size={14} color="#EF4444" fill="#EF4444" />
                      </View>
                    </View>

                    {/* Comment body */}
                    {comment.is_gif ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                          backgroundColor: "#F9FAFB",
                          borderRadius: 10,
                          padding: 12,
                          marginBottom: 14,
                        }}
                      >
                        <View
                          style={{
                            width: 36,
                            height: 36,
                            backgroundColor: "#E5E7EB",
                            borderRadius: 6,
                          }}
                        />
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Inter_600SemiBold",
                              color: "#374151",
                            }}
                          >
                            GIF Comment
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: "Inter_400Regular",
                              color: "#9CA3AF",
                            }}
                          >
                            Visual expression
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "Inter_400Regular",
                          color: "#6B7280",
                          lineHeight: 20,
                          fontStyle: "italic",
                          marginBottom: 14,
                        }}
                        numberOfLines={2}
                      >
                        "{comment.content}"
                      </Text>
                    )}

                    {/* Footer row */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderColor: "#F3F4F6",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#9CA3AF",
                            fontFamily: "Inter_500Medium",
                          }}
                        >
                          on {MOCK_CREATORS[idx] || comment.post_title}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 2,
                          }}
                        >
                          <TrendingUp size={10} color="#22D3A5" />
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: "Inter_600SemiBold",
                              color: "#22D3A5",
                            }}
                          >
                            {MOCK_GROWTH[idx] || "+84 today"}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: "Inter_500Medium",
                              color: "#C4C4CC",
                              marginLeft: 4,
                            }}
                          >
                            · {MOCK_RANKS[idx] || "Top 10%"}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <ExternalLink size={10} color="#C4C4CC" />
                          <Text
                            style={{
                              fontSize: 9,
                              fontFamily: "Inter_500Medium",
                              color: "#C4C4CC",
                            }}
                          >
                            receipt
                          </Text>
                        </View>
                        <Share2 size={15} color="#C4C4CC" />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
