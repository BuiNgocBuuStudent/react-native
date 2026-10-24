import React from "react";
import { View, Text, Image, FlatList, Pressable, StyleSheet } from "react-native";
import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { colors, formatPrice } from "../theme";
import { PHONES, PHONE_COLORS } from "../data/phone";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8: Lấy ids từ useFavorites(); lọc PHONES theo ids; bấm mở ProductDetails
  const { ids } = useFavorites();
  const favoritePhones = PHONES.filter((phone) => ids.includes(phone.id));

  if (favoritePhones.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritePhones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Image
            source={PHONE_COLORS[item.defaultColor].image}
            style={styles.thumb}
            resizeMode="contain"
          />
          <View style={styles.cardInfo}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.supplier}>Cung cấp bởi: {item.supplier}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.bg,
  },
  emptyText: {
    fontSize: 16,
    color: colors.muted,
    fontStyle: "italic",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
  },
  thumb: {
    width: 70,
    height: 90,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
});