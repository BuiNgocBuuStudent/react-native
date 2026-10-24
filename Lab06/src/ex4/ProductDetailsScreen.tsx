import React from "react";
import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { RootProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { PHONES, PHONE_COLORS } from "../data/phone";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: Lấy id rồi tìm phone trong PHONES
  const { id } = route.params;
  const { has, toggle } = useFavorites();
  const phone = PHONES.find((p) => p.id === id);

  // TODO 5: Không tìm thấy sản phẩm
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFavorite = has(phone.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* TODO 6: Hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp */}
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} size={16} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplier}>
          Cung cấp bởi: <Text style={styles.supplierBold}>{phone.supplier}</Text>
        </Text>

        {/* TODO 7: Nút lưu vào yêu thích */}
        <Pressable
          style={[styles.favBtn, isFavorite && styles.favBtnActive]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={[styles.favBtnText, isFavorite && styles.favBtnTextActive]}>
            {isFavorite ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: colors.red,
  },
  image: {
    width: 200,
    height: 250,
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 8,
  },
  supplier: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 24,
  },
  supplierBold: {
    fontWeight: "bold",
    color: colors.text,
  },
  favBtn: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
  },
  favBtnActive: {
    backgroundColor: colors.red,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
  },
  favBtnTextActive: {
    color: "#FFFFFF",
  },
});