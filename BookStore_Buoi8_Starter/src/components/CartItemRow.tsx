import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; //

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// TODO BT8.6: nút −/+ với STATE CỤC BỘ + debounce 300ms
//   1) const [qty, setQty] = useState(item.quantity); const debouncedQty = useDebounce(qty, 300);
//   2) useEffect: khi debouncedQty khác item.quantity → onChangeQty(item.bookId, debouncedQty)
//   3) useEffect: khi item.quantity đổi từ nơi khác → setQty(item.quantity)
//   4) canDec = qty > 1; canInc = qty < item.stock (không vượt tồn kho); nút bị mờ khi không bấm được
//   5) hiển thị "Còn {item.stock}"
// Hiện tại chỉ hiện số lượng tĩnh "x{quantity}".
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // 1) Quản lý số lượng cục bộ và debounce 300ms
  const [qty, setQty] = useState(item.quantity); //
  const debouncedQty = useDebounce(qty, 300); //

  // 2) Đẩy lên store khi debouncedQty đổi khác item.quantity[cite: 1]
  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty); //[cite: 1]
    }
  }, [debouncedQty]); //[cite: 1]

  // 3) Đồng bộ lại state cục bộ nếu store thay đổi từ nơi khác[cite: 1]
  useEffect(() => {
    setQty(item.quantity); //[cite: 1]
  }, [item.quantity]); //[cite: 1]

  // 4) Điều kiện giới hạn tăng/giảm[cite: 1]
  const canDec = qty > 1; //[cite: 1]
  const canInc = qty < item.stock; //[cite: 1]

  return (
    <View style={styles.container}>
      {/* Khối hiển thị ảnh/icon sách và thông tin tên/giá đã có sẵn */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} đ</Text>

        {/* 5) Cụm nút - số lượng + và dòng tồn kho */}
        <View style={styles.qtyContainer}>
          <View style={styles.stepper}>
            <Pressable
              disabled={!canDec} //[cite: 1]
              onPress={() => setQty((q) => q - 1)} //[cite: 1]
              accessibilityLabel="Giảm" //[cite: 1]
              style={[styles.stepBtn, !canDec && styles.disabledBtn]}
            >
              <Text style={[styles.stepText, !canDec && styles.disabledText]}>−</Text>
            </Pressable>

            <Text style={styles.qtyText}>{qty}</Text>

            <Pressable
              disabled={!canInc} //[cite: 1]
              onPress={() => setQty((q) => q + 1)} //[cite: 1]
              accessibilityLabel="Tăng" //[cite: 1]
              style={[styles.stepBtn, !canInc && styles.disabledBtn]}
            >
              <Text style={[styles.stepText, !canInc && styles.disabledText]}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.stockText}>Còn {item.stock}</Text>
        </View>
      </View>

      {/* Nút xóa thùng rác (sẽ gắn confirmDialog ở BT8.7) */}
      <Pressable onPress={() => onRemove(item.bookId)} style={styles.deleteBtn}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  todo: { borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.warning, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: "#FFFBEB", alignSelf: "flex-start", marginTop: 4 },
  todoText: { color: "#B45309", fontSize: 11, fontWeight: "700" },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  trash: { fontSize: 22 },
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#3B3FD8",
    marginTop: 2,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
  },
  stepBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  disabledBtn: {
    opacity: 0.35,
  },
  stepText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#94A3B8",
  },
  qtyText: {
    paddingHorizontal: 8,
    fontSize: 15,
    fontWeight: "600",
  },
  stockText: {
    fontSize: 12,
    color: "#64748B",
  },
  deleteBtn: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
});
