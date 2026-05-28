import { Tabs } from "expo-router";
import { Home, Trophy, Image as ImageIcon, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.5,
          borderColor: "rgba(0,0,0,0.08)",
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#0A0A10",
        tabBarInactiveTintColor: "#BCBCC6",
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Inter_500Medium",
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Hall of Fame",
          tabBarIcon: ({ color }) => <ImageIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="league"
        options={{
          title: "League",
          tabBarIcon: ({ color }) => <Trophy color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
