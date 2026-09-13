import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './component/Header';
import { CategoryChips } from './component/CategoryChips';
import { BookGrid } from './component/BookGrid';
import { FloatingCartButton } from './component/FloatingCartButton';
import { BookDetail } from './component/BookDetail';
import { Book } from './data';
import { BOOKS } from './data';


export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Hàm xử lý khi người dùng nhấn thêm vào giỏ hàng
  const handleAddToCart = (book?: Book) => {
    setCartCount(prevCount => prevCount + 1);
    // Optionally close detail after adding
    if (book) setSelectedBook(null);
  };

  const handlePressBook = (id: number) => {
    const found = BOOKS.find(b => b.id === id) || null;
    setSelectedBook(found);
  };

  const handleCloseDetail = () => setSelectedBook(null);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — nhớ paddingBottom đủ lớn để
          FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
        <BookGrid 
          books={selectedCategory ? BOOKS.filter(b => b.category === selectedCategory) : BOOKS} 
          onPressBook={handlePressBook} 
        />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
      <FloatingCartButton count={cartCount} onPress={() => {}} />

      <BookDetail
        book={selectedBook}
        visible={selectedBook !== null}
        onClose={handleCloseDetail}
        onAddToCart={() => handleAddToCart(selectedBook || undefined)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
});