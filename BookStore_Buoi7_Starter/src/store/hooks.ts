// ADAPTER: component chỉ gọi useCart() / useAuth() / useWishlist().
// Nếu sau này đổi sang Recoil/Zustand, chỉ sửa file này — UI không phải sửa.
import { useCallback, useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";
import { addItem, clearCart, removeItem, setQuantity } from "./cartSlice";
import { logout, setCredentials, updateUser } from "./authSlice";
import { toggleWishlist } from "./wishlistSlice";
import { CartItem, User } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Trong src/store/hooks.ts
export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  // 1. Phải sửa 0 * items.length thành reduce tính tổng thực tế:
  const totalQuantity = useMemo(
    () => items.reduce((n, i) => n + i.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((n, i) => n + i.price * i.quantity, 0),
    [items]
  );

  // 2. Đảm bảo các hàm bên dưới có gọi dispatch(...):
  return {
    items,
    totalQuantity,
    totalPrice,
    add: (item: Omit<CartItem, "quantity">) => dispatch(addItem(item)),
    remove: (bookId: number) => dispatch(removeItem(bookId)),
    setQty: (bookId: number, quantity: number) =>
      dispatch(setQuantity({ bookId, quantity })),
    clear: () => dispatch(clearCart()),
  };
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((s) => s.auth);

  return {
    user,
    token,
    // BT7.4b: Đăng nhập hợp lệ khi có CẢ token và user
    isLoggedIn: !!token && !!user,
    signIn: (u: User, t: string) => dispatch(setCredentials({ user: u, token: t })),
    signOut: () => dispatch(logout()),
  };
}

export function useWishlist() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);
  return {
    ids,
    isFavorite: useCallback((bookId: number) => ids.includes(bookId), [ids]),
    toggle: useCallback((bookId: number) => dispatch(toggleWishlist(bookId)), [dispatch]),
  };
}
