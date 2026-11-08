import { StyleSheet, View } from "react-native";
import { TodoBox } from "../components/TodoBox";
import { BookGrid } from "../components/BookGrid"; // lưới 2 cột dùng lại
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Book } from "../types";

// TODO BT8.8b: màn Danh sách yêu thích
//   1) const { ids } = useWishlist(); state books / loading / error; useEffect gọi getBooks() (xử lý loading + lỗi + Thử lại như HomeScreen)
//   2) favorites = books.filter((b) => ids.includes(b.id))  (useMemo)
//   3) <BookGrid data={favorites} onPressBook=... /> — bỏ tim tại đây thì sách biến mất ngay
//   4) ListEmptyComponent = <EmptyState emoji="💔" title="Chưa có sách yêu thích" ... actionLabel="Khám phá sách" /> → về Home
export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  // TODO BT8.8b:
  // 1) Lấy ids từ store và tạo state
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 2) Lọc các sách có trong store ids
  const favorites = useMemo(
    () => books.filter((b) => ids.includes(b.id)),
    [books, ids]
  );

  // 3) Xử lý loading và error
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  // 4) Hiển thị BookGrid và ListEmptyComponent
  return (
    <BookGrid
      data={favorites}
      onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
      ListEmptyComponent={
        <EmptyState
          emoji="💔"
          title="Chưa có sách yêu thích"
          message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
          actionLabel="Khám phá sách"
          onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
        />
      }
    />
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.bg, padding: 16 } });
