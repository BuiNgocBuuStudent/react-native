import React from "react";
import { View, Text, Image, FlatList, Pressable, StyleSheet } from "react-native";
import { TabProps } from "./types";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { PHONES, PHONE_COLORS } from "../data/phone";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  // TODO 3: FlatList data={PHONES}; onPress -> navigation.navigate("ProductDetails", { id: item.id })
  return (
    <FlatList
      data={PHONES}
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
            <View style={styles.ratingRow}>
              <Stars value={item.rating} size={14} />
              <Text style={styles.review}>({item.reviewCount})</Text>
            </View>
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
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  review: {
    fontSize: 12,
    color: colors.muted,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
});