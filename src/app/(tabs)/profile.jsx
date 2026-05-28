import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Instagram,
  ShieldCheck,
  Bell,
  ExternalLink,
  ChevronRight,
  Copy,
  BadgeCheck,
  Heart,
  TrendingUp,
} from "lucide-react-native";

export default function Profile() {
  const insets = useSafeAreaInsets();

  const onShareProfile = async () => {
    try {
      await Share.share({
        message:
          "Check out my verified comment flexes: commentflex.app/alex_ig",
        url: "https://commentflex.app/alex_ig",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#F8F8FB", paddingTop: insets.top }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dark Hero Profile Card ── */}
        <View
          style={{
            backgroundColor: "#0E0E1C",
            paddingTop: 28,
            paddingBottom: 28,
            paddingHorizontal: 24,
            marginBottom: 0,
          }}
        >
          {/* Ambient glow */}
          <View
            style={{
              position: "absolute",
              top: -30,
              left: "15%",
              right: "15%",
              height: 120,
              backgroundColor: "rgba(75, 140, 247, 0.08)",
              borderRadius: 999,
            }}
            pointerEvents="none"
          />

          {/* Avatar + info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginBottom: 22,
            }}
          >
            <View>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#1A1A2E",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: "#4B8CF7",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#0E0E1C",
                }}
              >
                <BadgeCheck size={10} color="white" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 17,
                  fontFamily: "Inter_600SemiBold",
                  marginBottom: 2,
                }}
              >
                Alex Flex
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 12,
                  fontFamily: "Inter_400Regular",
                }}
              >
                @alex_ig
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(34, 211, 165, 0.1)",
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  color: "#22D3A5",
                  fontSize: 10,
                  fontFamily: "Inter_600SemiBold",
                  letterSpacing: 0.5,
                }}
              >
                10K CLUB
              </Text>
            </View>
          </View>

          {/* Stats row */}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginBottom: 22,
              paddingTop: 20,
              borderTopWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_600SemiBold",
                  color: "#FFFFFF",
                  letterSpacing: -1,
                }}
              >
                24.6K
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Total Likes
              </Text>
            </View>
            <View
              style={{ width: 1, backgroundColor: "rgba(255,255,255,0.07)" }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
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
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                League Rank
              </Text>
            </View>
            <View
              style={{ width: 1, backgroundColor: "rgba(255,255,255,0.07)" }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <TrendingUp size={12} color="#22D3A5" />
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_600SemiBold",
                    color: "#22D3A5",
                    letterSpacing: -1,
                  }}
                >
                  2.1K
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Inter_500Medium",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Today
              </Text>
            </View>
          </View>

          {/* Public share link */}
          <TouchableOpacity
            onPress={onShareProfile}
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  fontFamily: "Inter_500Medium",
                  letterSpacing: 0.5,
                  marginBottom: 2,
                }}
              >
                YOUR PUBLIC PROOF LINK
              </Text>
              <Text
                style={{
                  color: "#4B8CF7",
                  fontSize: 13,
                  fontFamily: "Inter_500Medium",
                }}
              >
                commentflex.app/alex_ig
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Copy size={14} color="rgba(255,255,255,0.25)" />
              <ExternalLink size={14} color="rgba(255,255,255,0.25)" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Settings ── */}
        <View style={{ padding: 18 }}>
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_600SemiBold",
              color: "#9CA3AF",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
              marginTop: 8,
            }}
          >
            Data & Verification
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: 1,
                borderColor: "#F3F4F6",
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Instagram size={17} color="#374151" />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: "Inter_500Medium",
                  color: "#111827",
                }}
              >
                Instagram Connection
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#22D3A5",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Inter_500Medium",
                    color: "#22D3A5",
                  }}
                >
                  Active
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <ShieldCheck size={17} color="#374151" />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: "Inter_500Medium",
                  color: "#111827",
                }}
              >
                Verified Mode
              </Text>
              <Switch value={true} trackColor={{ true: "#4B8CF7" }} />
            </View>
          </View>

          <Text
            style={{
              fontSize: 11,
              fontFamily: "Inter_600SemiBold",
              color: "#9CA3AF",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
              marginTop: 24,
            }}
          >
            Notifications
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Bell size={17} color="#374151" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_500Medium",
                    color: "#111827",
                  }}
                >
                  Milestone Alerts
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter_400Regular",
                    color: "#9CA3AF",
                    marginTop: 1,
                  }}
                >
                  1K · 10K · 50K · 100K
                </Text>
              </View>
              <ChevronRight size={16} color="#BCBCC6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
