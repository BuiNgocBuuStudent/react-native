import React, { createContext, useContext, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// ==========================================
// 1. CONTEXT DÙNG CHUNG (TODO 3 NÂNG CAO)
// ==========================================
interface SettingsContextType {
  notify: boolean;
  setNotify: (value: boolean) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);

  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      {children}
    </SettingsContext.Provider>
  );
}

const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
};

// ==========================================
// 2. CẤU HÌNH ROUTE VÀ DRAWER
// ==========================================
type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// ==========================================
// 3. CÁC MÀN HÌNH NỘI DUNG
// ==========================================
function HomeScreen() {
  const { dark } = useSettings();

  return (
    <View style={[s.center, { backgroundColor: dark ? "#121212" : colors.bg }]}>
      <Text style={[s.big, { color: dark ? "#FFFFFF" : colors.text }]}>
        Xin chào 👋
      </Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useSettings();

  return (
    <View style={[s.center, { backgroundColor: dark ? "#121212" : colors.bg }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, { color: dark ? "#FFFFFF" : colors.text }]}>
        Nguyễn Văn An
      </Text>
      <Text style={[s.muted, { color: dark ? "#A0A0A0" : colors.muted }]}>
        an.nguyen@example.com
      </Text>
    </View>
  );
}

// TODO 1: Màn hình Settings với 2 Switch và dòng trạng thái
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();

  return (
    <View style={[s.settingsContainer, { backgroundColor: dark ? "#121212" : "#FFFFFF" }]}>
      {/* Tùy chọn 1: Thông báo */}
      <View style={[s.row, { borderBottomColor: dark ? "#333333" : colors.line }]}>
        <Text style={[s.label, { color: dark ? "#FFFFFF" : colors.text }]}>
          Nhận thông báo
        </Text>
        <Switch
          value={notify}
          onValueChange={setNotify}
          trackColor={{ false: colors.grey, true: colors.red }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Tùy chọn 2: Chế độ tối */}
      <View style={[s.row, { borderBottomColor: dark ? "#333333" : colors.line }]}>
        <Text style={[s.label, { color: dark ? "#FFFFFF" : colors.text }]}>
          Chế độ tối
        </Text>
        <Switch
          value={dark}
          onValueChange={setDark}
          trackColor={{ false: colors.grey, true: colors.red }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Dòng tóm tắt trạng thái */}
      <View style={s.statusSummary}>
        <Text style={[s.statusText, { color: dark ? "#A0A0A0" : colors.muted }]}>
          Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
        </Text>
      </View>
    </View>
  );
}

// ==========================================
// 4. DRAWER NAVIGATOR CONTAINER (TODO 2)
// ==========================================
function DrawerContent() {
  const { dark } = useSettings();

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: dark ? "#CCCCCC" : colors.muted,
        drawerStyle: {
          backgroundColor: dark ? "#1E1E1E" : "#FFFFFF",
        },
        headerStyle: {
          backgroundColor: dark ? "#1E1E1E" : "#FFFFFF",
        },
        headerTintColor: dark ? "#FFFFFF" : colors.text,
        drawerIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Cá nhân" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Cài đặt" }}
      />
    </Drawer.Navigator>
  );
}

export function DrawerApp() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <DrawerContent />
      </NavigationContainer>
    </SettingsProvider>
  );
}

// ==========================================
// 5. STYLESHEET
// ==========================================
const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  big: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  muted: {
    fontSize: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusSummary: {
    marginTop: 28,
    alignItems: "center",
  },
  statusText: {
    fontSize: 15,
    fontStyle: "italic",
  },
});