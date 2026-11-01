import { Pressable, StyleSheet, View,Text } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { TodoBox } from "../components/TodoBox";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks } from "../utils/filters";
import { MOCK_BOOKS, MOCK_CATEGORIES } from "../data/mockBooks"; // ← dữ liệu GIẢ
import { PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";
import { useCart } from "../store/hooks";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { Book, Category } from "../types";

export function HomeScreen({ navigation }: TabScreenProps<"Home">) {
  // TODO BT7.3d: lấy { totalQuantity } từ useCart() và truyền vào <FloatingCartButton count=... />
  const { totalQuantity } = useCart();

// Tại chỗ render FloatingCartButton (TODO BT7.3d):
<FloatingCartButton
  count={totalQuantity}
  onPress={() => navigation.navigate("Cart")}
/>
  // TODO BT7.5b: thay dữ liệu giả bằng state: books, categories, loading, error  (useState)
  //   rồi viết hàm load() gọi SONG SONG: const [b, c] = await Promise.all([getBooks(), getCategories()])
  //   gọi load() trong useEffect(…, []) — nhớ try/catch/finally.
const [books, setBooks] = useState<Book[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const load = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const [b, c] = await Promise.all([getBooks(), getCategories()]);
    setBooks(b);
    setCategories(c);
  } catch (e) {
    setError(getErrorMessage(e));
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  load();
}, [load]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);

  // BT7.7a: Trì hoãn từ khoá tìm kiếm 400ms
const debouncedKeyword = useDebounce(keyword, 400);

// BT7.7c: Lọc danh sách sách khi books, debouncedKeyword, categoryId hoặc priceRange thay đổi
const visibleBooks = useMemo(
  () =>
    filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    }),
  [books, debouncedKeyword, categoryId, priceRange]
);

  // TODO BT7.8b: nhận categoryId từ route.params (Tab Danh mục gửi sang) → setCategoryId(id) rồi navigation.setParams({ categoryId: undefined })

  // TODO BT7.5c: hiển thị <LoadingView/> khi loading, <ErrorView message onRetry={load}/> khi error, ngược lại là BookGrid
  // TODO BT7.7d: ListEmptyComponent = <EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp" … actionLabel="Xóa bộ lọc" /> + hàm clearFilters
  // TODO BT7.7e: nút "✕ Xóa bộ lọc" (chỉ hiện khi đang có bộ lọc) trong header của lưới
  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };
  return (
    <View style={styles.container}>
      {hasFilter && (
  <Pressable  onPress={clearFilters}>
  </Pressable>
)}
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}
    {loading ? (
  <LoadingView label="Đang tải sách…" />
) : error ? (
  <ErrorView message={error} onRetry={load} />
) : (
  <BookGrid
  data={visibleBooks}
  onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
  ListEmptyComponent={
    <EmptyState
      emoji="🔎"
      title="Không tìm thấy sách phù hợp"
      message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
      actionLabel="Xóa bộ lọc"
      onAction={clearFilters}
    />
  }
/>
)}
<FloatingCartButton
  count={totalQuantity}
  onPress={() => navigation.navigate("Cart")}
/>    

</View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
