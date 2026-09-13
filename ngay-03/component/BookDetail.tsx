import React from 'react';
import { Modal, View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Book } from '../data';

export function BookDetail({
  book,
  visible,
  onClose,
  onAddToCart,
}: {
  book: Book | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  if (!book) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: book.cover }} style={styles.cover} />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
          <Text style={styles.description}>{book.description}</Text>
        </ScrollView>

        <View style={styles.actions}>
          <Pressable style={styles.addButton} onPress={onAddToCart}>
            <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 16, alignItems: 'center' },
  cover: { width: 220, height: 300, borderRadius: 8, backgroundColor: '#EEE' },
  title: { marginTop: 12, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  author: { marginTop: 6, fontSize: 14, color: '#555' },
  price: { marginTop: 8, fontSize: 16, fontWeight: '700', color: '#1E1B4B' },
  description: { marginTop: 12, fontSize: 14, color: '#333', lineHeight: 20 },
  actions: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4338CA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  addButtonText: { color: '#FFF', fontWeight: '700' },
  closeButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  closeButtonText: { color: '#111827', fontWeight: '700' },
});
