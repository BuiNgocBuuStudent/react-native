import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { TodoBox } from "../components/TodoBox";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import React, { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";

const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000đ", discount: (s) => Math.min(50000, s) },
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const finalTotal = totalPrice; // TODO BT8.C2 (thử thách): trừ mã giảm giá → finalTotal = totalPrice - discount
  const { isLoggedIn } = useAuth();
  // TODO BT8.7a: xóa sản phẩm có XÁC NHẬN — dùng confirmDialog(title, message, onConfirm) đã viết sẵn ở utils/dialog.ts
  //   (Alert.alert không chạy trên web nên đã bọc sẵn). Hiện tại xóa ngay không hỏi.
const askRemove = (bookId: number) => {
  const item = items.find((i) => i.bookId === bookId); //[cite: 1]
  confirmDialog(
    "Xóa sản phẩm",
    `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`,
    () => remove(bookId) //[cite: 1]
  );
};

  const [couponInput, setCouponInput] = useState("");
const [coupon, setCoupon] = useState<string | null>(null);
const [couponMsg, setCouponMsg] = useState<string | null>(null);

// 2. Tính số tiền giảm và tổng thanh toán mới[cite: 1]
const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0;

// 3. Hàm xử lý nút Áp dụng[cite: 1]
const applyCoupon = () => {
  const code = couponInput.trim().toUpperCase();
  if (COUPONS[code]) {
    setCoupon(code);
    setCouponMsg(`Đã áp dụng ${code}: ${COUPONS[code].label}`)
  } else {
    setCoupon(null);
    setCouponMsg("Mã giảm giá không hợp lệ");
  }
};
  // TODO BT8.4: bảo vệ Checkout — nếu isLoggedIn → navigate("Checkout", { total: finalTotal })
  //   chưa đăng nhập → navigate("Login", { redirectTo: "Checkout", total: finalTotal })
const goCheckout = () => {
  if (isLoggedIn) {
    navigation.navigate("Checkout", { total: finalTotal });
  } else {
    navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  }
};

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé." actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          {/* Ô nhập mã giảm giá và nút Áp dụng */}
<View style={styles.couponRow}>
  <TextInput
    style={styles.couponInput}
    placeholder="Mã giảm giá (SALE10 / GIAM50K)"
    value={couponInput}
    onChangeText={setCouponInput}
    autoCapitalize="characters"
  />
  <Pressable style={styles.applyBtn} onPress={applyCoupon}>
    <Text style={styles.applyBtnText}>Áp dụng</Text>
  </Pressable>
</View>

{couponMsg ? (
  <Text style={[styles.couponMsg, !coupon && styles.couponMsgError]}>
    {couponMsg}
  </Text>
) : null}

{/* Bảng chi tiết tính tiền */}
<View style={styles.summaryContainer}>
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>Tạm tính</Text>
    <Text style={styles.summaryValue}>{totalPrice.toLocaleString("vi-VN")} đ</Text>
  </View>

  {discount > 0 && (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, { color: "#16A34A" }]}>Giảm giá</Text>
      <Text style={[styles.summaryValue, { color: "#16A34A" }]}>
        -{discount.toLocaleString("vi-VN")} đ
      </Text>
    </View>
  )}

  <View style={[styles.summaryRow, styles.totalRow]}>
    <Text style={styles.totalLabel}>Tổng cộng</Text>
    <Text style={styles.totalValue}>{finalTotal.toLocaleString("vi-VN")} đ</Text>
  </View>
</View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  couponRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: "#fff",
  },
  applyBtn: {
    backgroundColor: "#3B3FD8",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  applyBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  couponMsg: {
    fontSize: 13,
    color: "#16A34A",
    marginTop: 6,
  },
  couponMsgError: {
    color: "#EF4444",
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: "#64748B",
  },
  summaryValue: {
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B3FD8",
  },
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
});
