import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; // dùng khi đọc loadJSON<CartItem[]>
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

export function usePersistence() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const { user, token } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistIds = useSelector((state: RootState) => state.wishlist.ids);

  // 1. Đọc song song cả 3 nguồn khi app khởi động
  useEffect(() => {
    (async () => {
      // TODO BT8.7b: đọc cả 3 bằng Promise.all
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY),
      ]);

      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      if (cart) dispatch(hydrateCart(cart));
      if (wish) dispatch(hydrateWishlist(wish));

      setReady(true);
    })();
  }, [dispatch]);

  // Lưu hoặc xóa phiên đăng nhập (đã làm ở Bài 8.3)
  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  // 2. Tự động ghi giỏ hàng và danh sách yêu thích khi có thay đổi
  // TODO BT8.7b:
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
