import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../type";
import { PHONE_COLORS } from "../data/phone";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      {/* Khối hiển thị ảnh sản phẩm lớn */}
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Khối thông tin chi tiết */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.helpCircle}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút chọn màu / chọn loại */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>&gt;</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút "CHỌN MUA" đặt ngoài info, nằm sát đáy màn hình */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  imageWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "90%",
  },
  info: {
    marginBottom: 16,
  },
  name: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  review: {
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginRight: 20,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 12,
  },
  helpCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  helpText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  chooseBtn: {
    position: "relative",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  chooseBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },
  arrowIcon: {
    position: "absolute",
    right: 12,
    fontSize: 18,
    color: colors.text,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});