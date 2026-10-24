import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors, formatPrice } from "../theme";
import { PHONES } from "../data/phone";

// 1. Định nghĩa ParamList cho Tab Navigator
type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Tên icon: [khi chọn (focused), khi không chọn]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// ==========================================
// 2. TAB 1: HOME TAB
// ==========================================
function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
          <Text style={s.cardSubtitle}>{item.supplier}</Text>
          <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
        </View>
      )}
    />
  );
}

// ==========================================
// 3. TAB 2: SEARCH TAB (TODO 1)
// ==========================================
function SearchTab() {
  const [keyword, setKeyword] = useState("");

  // Lọc sản phẩm theo từ khóa không phân biệt hoa thường
  const filteredPhones = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={s.searchContainer}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa tìm kiếm..."
        placeholderTextColor={colors.muted}
        style={s.input}
        clearButtonMode="while-editing"
      />

      {filteredPhones.length === 0 ? (
        <View style={s.emptyContainer}>
          <Text style={s.emptyText}>Không có kết quả cho “{keyword}”</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPhones}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardTitle}>{item.name}</Text>
              <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ==========================================
// 4. TAB 3: PROFILE TAB (TODO 2)
// ==========================================
function ProfileTab() {
  const user = {
    name: "Bùi Ngọc Bửu",
    email: "buu.bui@example.com",
  };

  // Lấy chữ cái đầu của tên (ví dụ: "B")
  const initials = user.name
    .split(" ")
    .pop()
    ?.charAt(0)
    .toUpperCase() || "U";

  return (
    <View style={s.center}>
      {/* Vòng tròn Avatar */}
      <View style={s.avatar}>
        <Text style={s.avatarText}>{initials}</Text>
      </View>
      <Text style={s.profileName}>{user.name}</Text>
      <Text style={s.profileEmail}>{user.email}</Text>
    </View>
  );
}

// ==========================================
// 5. COMPONENT CHÍNH (TODO 3)
// ==========================================
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = ICONS[route.name][focused ? 0 : 1];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// 6. STYLESHEET
// ==========================================
const s = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    fontStyle: "italic",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.muted,
  },
});