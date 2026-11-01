import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = {
  Home: "🏠",
  Categories: "🗂️",
  Cart: "🛒",
  Account: "👤",
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalQuantity } = useCart(); // <-- Phải gọi useCart() ở đây

  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    badge: route.name === "Cart" ? totalQuantity : undefined, // <-- Phải có dòng này
  }));
  // BT7.1a: Xử lý sự kiện khi bấm vào từng tab
  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;

    const isFocused = state.routes[state.index].key === key;
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  // BT7.1a: Trả về component TabBar tự dựng
  return (
    <TabBar
      items={items}
      activeKey={state.routes[state.index].key}
      onPress={onPress}
    />
  );
}