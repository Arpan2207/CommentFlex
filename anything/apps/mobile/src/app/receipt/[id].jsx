import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Share,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BadgeCheck,
  Share2,
  TrendingUp,
  Award,
  ExternalLink,
  Pin,
} from "lucide-react-native";

const MOCK_CREATOR = {
  name: "Khaby Lame",
  handle: "@khaby.lame",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=khabyLame",
  reelTitle: "POV: when someone overcomplicates things",
  followerCount: "82.3M",
};

export default function ReceiptPreview() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: comment, isLoading } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const res = await fetch(`/api/comments?userId=1`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data.find((c) => c.id === parseInt(id));
    },
  });

  const onShare = async () => {
    try {
      await Share.share({
        message: `${comment.like_count.toLocaleString()} likes on my comment 🔥\n\nView my verified receipt: commentflex.app/alex_ig`,
        url: "https://commentflex.app/alex_ig",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatLikes = (count) => {
    if (!count) return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#080810",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "Inter_400Regular",
            fontSize: 13,
            letterSpacing: 0.5,
          }}
        >
          Generating receipt...
        </Text>
      </View>
    );
  }

  if (!comment) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#080810",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "Inter_400Regular",
            fontSize: 13,
          }}
        >
          Receipt not found
        </Text>
      </View>
    );
  }

  const growthText = comment.like_count > 10000 ? "+2.1K today" : "+284 today";
  const rankText = comment.like_count > 10000 ? "Top 1%" : "Top 5%";
  const threadRank = comment.is_top ? "#1 in thread" : "#3 in thread";

  return (
    <View style={{ flex: 1, backgroundColor: "#080810" }}>
      {/* Ambient blue glow at top */}
      <View
        style={{
          position: "absolute",
          top: -60,
          left: "10%",
          right: "10%",
          height: 280,
          backgroundColor: "rgba(75, 140, 247, 0.07)",
          borderRadius: 999,
        }}
        pointerEvents="none"
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 18,
          paddingBottom: insets.bottom + 130,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── The Receipt Card ── */}
        <View
          style={{
            backgroundColor: "#0E0E1C",
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          {/* ─── 1. Creator Context ─── */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              borderBottomWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            {/* Creator info */}
            <Image
              source={{ uri: MOCK_CREATOR.avatar }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: "#1A1A2E",
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontFamily: "Inter_600SemiBold",
                  marginBottom: 1,
                }}
              >
                {MOCK_CREATOR.name}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontFamily: "Inter_400Regular",
                }}
              >
                {MOCK_CREATOR.handle} · {MOCK_CREATOR.followerCount}
              </Text>
            </View>

            {/* Reel Thumbnail */}
            <View
              style={{
                width: 50,
                height: 72,
                borderRadius: 10,
                backgroundColor: "#1E1E35",
                overflow: "hidden",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 6,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 36,
                  backgroundColor: "rgba(75, 140, 247, 0.18)",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 0,
                  right: 0,
                  height: 24,
                  backgroundColor: "rgba(251, 113, 133, 0.12)",
                }}
              />
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.65)",
                  borderRadius: 4,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 7,
                    fontFamily: "Inter_600SemiBold",
                    letterSpacing: 0.5,
                  }}
                >
                  REEL
                </Text>
              </View>
            </View>
          </View>

          {/* Reel title strip */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 11,
                fontFamily: "Inter_400Regular",
                fontStyle: "italic",
              }}
              numberOfLines={1}
            >
              "{MOCK_CREATOR.reelTitle}"
            </Text>
          </View>

          {/* ─── 2. The Big Number ─── */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 44,
              paddingBottom: 40,
              alignItems: "center",
            }}
          >
            {/* Verified pill */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "rgba(75, 140, 247, 0.12)",
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 5,
                marginBottom: 28,
              }}
            >
              <BadgeCheck size={11} color="#4B8CF7" />
              <Text
                style={{
                  color: "#4B8CF7",
                  fontSize: 10,
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 1.8,
                }}
              >
                VERIFIED FLEX
              </Text>
            </View>

            {/* Giant number */}
            <Text
              style={{
                fontSize: 96,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
                letterSpacing: -5,
                lineHeight: 92,
                includeFontPadding: false,
              }}
            >
              {formatLikes(comment.like_count)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter_500Medium",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 3.5,
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              Comment Likes
            </Text>

            {/* Growth indicator */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 18,
                backgroundColor: "rgba(34, 211, 165, 0.1)",
                borderRadius: 999,
                paddingHorizontal: 14,
                paddingVertical: 7,
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
                {growthText}
              </Text>
            </View>
          </View>

          {/* ─── 3. Comment Content ─── */}
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              backgroundColor: "rgba(255,255,255,0.04)",
              borderRadius: 18,
              padding: 20,
            }}
          >
            {/* Rank badge */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 14,
              }}
            >
              <Award size={12} color="#F59E0B" />
              <Text
                style={{
                  color: "#F59E0B",
                  fontSize: 11,
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 0.3,
                }}
              >
                {rankText} Comment · {threadRank}
              </Text>
            </View>

            {comment.is_gif ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: 10,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      fontFamily: "Inter_500Medium",
                    }}
                  >
                    GIF Comment
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 11,
                      fontFamily: "Inter_400Regular",
                      marginTop: 2,
                    }}
                  >
                    Visual expression
                  </Text>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Inter_400Regular",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 26,
                  fontStyle: "italic",
                }}
              >
                "{comment.content}"
              </Text>
            )}
          </View>

          {/* ─── 4. Footer with badges + share link ─── */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 18,
              paddingBottom: 24,
              borderTopWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Badges */}
            <View
              style={{
                flexDirection: "row",
                gap: 6,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(75, 140, 247, 0.12)",
                  borderRadius: 999,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    color: "#4B8CF7",
                    fontSize: 9,
                    fontFamily: "Inter_600SemiBold",
                    letterSpacing: 0.6,
                  }}
                >
                  VERIFIED
                </Text>
              </View>
              {comment.is_top && (
                <View
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                    borderRadius: 999,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#F59E0B",
                      fontSize: 9,
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 0.6,
                    }}
                  >
                    TOP COMMENT
                  </Text>
                </View>
              )}
              {comment.is_pinned && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: 999,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Pin size={8} color="rgba(255,255,255,0.4)" />
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 9,
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 0.6,
                    }}
                  >
                    PINNED
                  </Text>
                </View>
              )}
              {comment.like_count >= 10000 && (
                <View
                  style={{
                    backgroundColor: "rgba(34, 211, 165, 0.1)",
                    borderRadius: 999,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#22D3A5",
                      fontSize: 9,
                      fontFamily: "Inter_600SemiBold",
                      letterSpacing: 0.6,
                    }}
                  >
                    10K CLUB
                  </Text>
                </View>
              )}
            </View>

            {/* Verified share link */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginLeft: 8,
              }}
            >
              <ExternalLink size={10} color="rgba(255,255,255,0.2)" />
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                commentflex.app/alex_ig
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ── Action Buttons ── */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          left: 18,
          right: 18,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flex: 1,
            height: 54,
            backgroundColor: "rgba(255,255,255,0.07)",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              fontFamily: "Inter_500Medium",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShare}
          style={{
            flex: 2.8,
            height: 54,
            backgroundColor: "#4B8CF7",
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Share2 size={17} color="white" />
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Share to Stories
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
