import { api } from "../api/client";
import type { Book } from "../types";

export interface BookQuery {
  categoryId?: number;
  q?: string;
}

export async function getBooks(params?: BookQuery): Promise<Book[]> {
  // BT7.5a: Gọi GET /books kèm params (nếu có) và trả về mảng Book
  const res = await api.get<Book[]>("/books", { params });
  return res.data;
}

export async function getBookById(id: number): Promise<Book> {
  // BT7.5a: Gọi GET /books/:id và trả về chi tiết 1 cuốn sách
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}