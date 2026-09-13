import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { CATEGORIES } from "../data";

const DEMO_EXTRA_HEIGHT = false;

export function CategoryChips({
  selected,
  onSelect,
}: {
  selected?: string | null;
  onSelect: (name: string | null) => void;
}) {
  return (
    <View
      style={[
        styles.wrap,
        DEMO_EXTRA_HEIGHT && { height: 220, alignContent: "flex-start" },
      ]}
    >
      {CATEGORIES.map((name) => {
        const isSelected = selected === name;
        return (
          <Pressable
            key={name}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(isSelected ? null : name)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", // xếp các chip theo hàng...
    flexWrap: "wrap", // ...và tự xuống dòng khi hết chỗ ngang
    gap: 8, // khoảng cách đều cả 2 chiều (hàng lẫn cột) giữa các chip
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999, // bo tròn lớn -> dạng "viên thuốc" (pill)
    borderWidth: 1,
    borderColor: "#6366F1", // indigo
    // Không set "width" -> mỗi chip tự co giãn đúng theo độ dài tên danh mục
  },
  chipSelected: {
    backgroundColor: '#6366F1',
  },
  chipText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
