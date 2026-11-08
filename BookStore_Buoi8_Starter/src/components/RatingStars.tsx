import { colors } from "../theme";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// TODO BT8.5a: component sao TÁI SỬ DỤNG
//   - vẽ 5 ngôi sao ★: sao <= Math.round(value) màu colors.warning, còn lại colors.line; cỡ chữ = size
//   - nếu có onChange: bọc mỗi sao trong Pressable, bấm sao n → onChange(n)
interface Props {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  // TODO BT8.5a:
  const filled = Math.round(value);

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text
            key={n}
            style={{
              fontSize: size,
              color: n <= filled ? colors.warning : colors.line,
            }}
          >
            ★
          </Text>
        );

        return onChange ? (
          <Pressable
            key={n}
            onPress={() => onChange(n)}
            hitSlop={4}
            accessibilityLabel={`${n} sao`}
          >
            {star}
          </Pressable>
        ) : (
          star
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  todo: { borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.warning, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: "#FFFBEB" },
  todoText: { color: "#B45309", fontWeight: "700" },
});
