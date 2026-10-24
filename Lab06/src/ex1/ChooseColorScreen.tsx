import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, formatPrice } from "../theme";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../type";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phone";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      {/* Header: Ảnh nhỏ + Thông tin sản phẩm */}
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: Chỉ hiển thị khi đã chọn màu (picked !== undefined) */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceBold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      {/* Body: Danh sách chọn 4 màu + Nút XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: Nút "XONG" */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => {
            navigation.navigate("Product", { color: picked }, { merge: true });
          }}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    gap: 16,
  },
  thumb: {
    width: 104,
    height: 128,
  },
  headerText: {
    flex: 1,
    justifyContent: "space-between",
  },
  small: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
  },
  bold: {
    fontWeight: "bold",
    color: colors.text,
  },
  priceBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 2,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
  },
  swatch: {
    width: 80,
    height: 80,
    borderRadius: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});