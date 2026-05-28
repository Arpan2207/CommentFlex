import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Heart, BadgeCheck, Award, TrendingUp } from "lucide-react-native";

const MOCK_GROWTH = [
  "+2.1K today",
  "+842 today",
  "+310 today",
  "+198 today",
  "+94 today",
];
const MOCK_RANKS = ["Top 1%", "Top 2%", "Top 5%", "Top 5%", "Top 10%"];

function formatLikes(count) {
  if (!count) return "0";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export default function Gallery() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const userId = 1;

  const { data: comments } = useQuery({
    queryKey: ["comments", userId],
    queryFn: async () => {
      const res = await fetch(`/api/comments?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const sorted = comments
    ? [...comments].sort((a, b) => b.like_count - a.like_count)
    : [];
  const hero = sorted[0] || null;
  const rest = sorted.slice(1);

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F8FB", paddingTop: insets.top }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "Inter_600SemiBold",
            color: "#0A0A10",
            letterSpacing: -0.8,
          }}
        >
          Hall of Fame
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Inter_400Regular",
            color: "#9CA3AF",
            marginTop: 2,
          }}
        >
          Your all-time certified flexes.
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Card ── */}
        {hero && (
          <TouchableOpacity
            onPress={() => router.push(`/receipt/${hero.id}`)}
            style={{
              backgroundColor: "#0E0E1C",
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 14,
            }}
            activeOpacity={0.85}
          >
            {/* Ambient glow */}
            <View
              style={{
                position: "absolute",
                top: -40,
                left: "20%",
                right: "20%",
                height: 160,
                backgroundColor: "rgba(75, 140, 247, 0.12)",
                borderRadius: 999,
              }}
              pointerEvents="none"
            />

            <View style={{ padding: 28 }}>
              {/* Top row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 28,
                }}
              >
                {/* Label */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    borderRadius: 999,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Award size={11} color="#F59E0B" />
                  <Text
                    style={{
                      color: "#F59E0B",
                      fontSize: 10,
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 1,
                    }}
                  >
                    #1 FLEX
                  </Text>
                </View>

                {/* Verified badge */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <BadgeCheck size={12} color="#4B8CF7" />
                  <Text
                    style={{
                      color: "#4B8CF7",
                      fontSize: 10,
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 0.5,
                    }}
                  >
                    VERIFIED
                  </Text>
                </View>
              </View>

              {/* Giant like count */}
              <Text
                style={{
                  fontSize: 80,
                  fontFamily: "Inter_600SemiBold",
                  color: "#FFFFFF",
                  letterSpacing: -4,
                  lineHeight: 76,
                  includeFontPadding: false,
                }}
              >
                {formatLikes(hero.like_count)}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginTop: 8,
                  marginBottom: 20,
                }}
              >
                Comment Likes
              </Text>

              {/* Comment preview */}
              {!hero.is_gif && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_400Regular",
                    color: "rgba(255,255,255,0.45)",
                    fontStyle: "italic",
                    lineHeight: 22,
                    marginBottom: 24,
                  }}
                  numberOfLines={2}
                >
                  "{hero.content}"
                </Text>
              )}

              {/* Bottom row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 18,
                  borderTopWidth: 1,
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <TrendingUp size={12} color="#22D3A5" />
                  <Text
                    style={{
                      color: "#22D3A5",
                      fontSize: 12,
                      fontFamily: "Inter_600SemiBold",
                    }}
                  >
                    {MOCK_GROWTH[0]}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_500Medium",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  {MOCK_RANKS[0]} Comment
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* ── Section label ── */}
        {rest.length > 0 && (
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_600SemiBold",
              color: "#9CA3AF",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 12,
              marginTop: 4,
            }}
          >
            More Flexes
          </Text>
        )}

        {/* ── 2-Column Grid ── */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {rest.map((comment, idx) => (
            <TouchableOpacity
              key={comment.id}
              onPress={() => router.push(`/receipt/${comment.id}`)}
              style={{
                width: "48.5%",
                backgroundColor: "#17172A",
                borderRadius: 18,
                marginBottom: 12,
                overflow: "hidden",
                padding: 18,
                minHeight: 160,
                justifyContent: "space-between",
              }}
              activeOpacity={0.8}
            >
              {/* Top row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 11,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  #{idx + 2}
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <BadgeCheck size={10} color="#4B8CF7" />
                </View>
              </View>

              {/* Like count */}
              <Text
                style={{
                  fontSize: 38,
                  fontFamily: "Inter_600SemiBold",
                  color: "#FFFFFF",
                  letterSpacing: -2,
                  lineHeight: 36,
                  includeFontPadding: false,
                }}
              >
                {formatLikes(comment.like_count)}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginTop: 4,
                  marginBottom: 10,
                }}
              >
                Likes
              </Text>

              {/* Comment preview */}
              {!comment.is_gif && (
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Inter_400Regular",
                    color: "rgba(255,255,255,0.3)",
                    fontStyle: "italic",
                    lineHeight: 15,
                    marginBottom: 14,
                  }}
                  numberOfLines={2}
                >
                  "{comment.content}"
                </Text>
              )}
              {comment.is_gif && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter_400Regular",
                    }}
                  >
                    GIF Comment
                  </Text>
                </View>
              )}

              {/* Growth */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <TrendingUp size={9} color="#22D3A5" />
                <Text
                  style={{
                    color: "#22D3A5",
                    fontSize: 9,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  {MOCK_GROWTH[idx + 1] || "+84 today"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
