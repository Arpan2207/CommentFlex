import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import {
  Trophy,
  Users,
  Crown,
  TrendingUp,
  BadgeCheck,
  UserPlus,
} from "lucide-react-native";

export default function League() {
  const insets = useSafeAreaInsets();

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard", 1],
    queryFn: async () => {
      const res = await fetch(`/api/leagues/1/leaderboard`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F8FB", paddingTop: insets.top }}
    >
      {/* ── Dark Header ── */}
      <View
        style={{
          backgroundColor: "#0E0E1C",
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 24,
        }}
      >
        {/* Ambient glow */}
        <View
          style={{
            position: "absolute",
            top: -30,
            left: "10%",
            right: "10%",
            height: 100,
            backgroundColor: "rgba(245, 158, 11, 0.07)",
            borderRadius: 999,
          }}
          pointerEvents="none"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Inter_600SemiBold",
              color: "#FFFFFF",
              letterSpacing: -0.6,
            }}
          >
            Friends League
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: 999,
              paddingHorizontal: 12,
              paddingVertical: 7,
            }}
          >
            <UserPlus size={13} color="rgba(255,255,255,0.5)" />
            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                fontFamily: "Inter_500Medium",
              }}
            >
              Invite
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Inter_500Medium",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Your Rank
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
                letterSpacing: -1,
              }}
            >
              #1
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Inter_500Medium",
                color: "rgba(255,255,255,0.25)",
                marginTop: 2,
              }}
            >
              of 12 members
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Inter_500Medium",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              League Total
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Inter_600SemiBold",
                color: "#FFFFFF",
                letterSpacing: -1,
              }}
            >
              142K
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
                  fontFamily: "Inter_500Medium",
                  color: "#22D3A5",
                }}
              >
                +8.2K week
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Section Header ── */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 22,
          paddingVertical: 14,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Inter_600SemiBold",
            color: "#9CA3AF",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Weekly Leaderboard
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Inter_500Medium",
            color: "#BCBCC6",
          }}
        >
          Resets in 2d 14h
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 18, gap: 8 }}>
          {isLoading ? (
            <Text
              style={{
                fontSize: 13,
                color: "#9CA3AF",
                fontFamily: "Inter_400Regular",
                textAlign: "center",
                paddingVertical: 32,
              }}
            >
              Loading league data...
            </Text>
          ) : (
            leaderboard?.map((member, index) => (
              <View
                key={member.username}
                style={{
                  backgroundColor: index === 0 ? "#0E0E1C" : "#FFFFFF",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* Rank */}
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                    color:
                      index === 0
                        ? "#F59E0B"
                        : index < 3
                          ? "#4B8CF7"
                          : "#BCBCC6",
                    width: 22,
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>

                {/* Avatar */}
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri:
                        member.avatar_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: index === 0 ? "#1A1A2E" : "#F3F4F6",
                    }}
                  />
                  {index === 0 && (
                    <View
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        backgroundColor: "#F59E0B",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <Crown size={8} color="white" />
                    </View>
                  )}
                </View>

                {/* Name */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter_600SemiBold",
                      color: index === 0 ? "#FFFFFF" : "#111827",
                    }}
                  >
                    {member.username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Inter_400Regular",
                      color: index === 0 ? "rgba(255,255,255,0.35)" : "#9CA3AF",
                      marginTop: 1,
                    }}
                  >
                    @{member.ig_username}
                  </Text>
                </View>

                {/* Likes + growth */}
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Inter_600SemiBold",
                      color: index === 0 ? "#FFFFFF" : "#111827",
                      letterSpacing: -0.5,
                    }}
                  >
                    {(member.weekly_likes / 1000).toFixed(1)}K
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                      marginTop: 2,
                    }}
                  >
                    <TrendingUp size={9} color="#22D3A5" />
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Inter_500Medium",
                        color: "#22D3A5",
                      }}
                    >
                      +12%
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Invite card */}
        <TouchableOpacity
          style={{
            margin: 18,
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#F3F4F6",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserPlus size={18} color="#374151" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_600SemiBold",
                color: "#111827",
              }}
            >
              Invite Friends
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Inter_400Regular",
                color: "#9CA3AF",
                marginTop: 1,
              }}
            >
              Share your league invite code
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter_600SemiBold",
              color: "#4B8CF7",
            }}
          >
            Share →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
