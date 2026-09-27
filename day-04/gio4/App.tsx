// GIỜ 4 — Layout toàn màn hình: ScrollView & SafeAreaView
// Minh hoạ riêng: Bài 1 (HomeScreen hoàn chỉnh) + Bài 2 (BookDetailScreen).
// Chuyển qua lại bằng useState — tách khỏi TabBar (đó là nội dung của Giờ 5).
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { BOOKS } from './data';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => setCartCount((n) => n + 1)}
          />
        ) : (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => console.log('Xem giỏ hàng (thuộc Giờ 5)')}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
});
