import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorTitle}>Có lỗi xảy ra!</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: colors.blue,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});