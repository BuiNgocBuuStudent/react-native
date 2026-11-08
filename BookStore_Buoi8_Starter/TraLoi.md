# Trả Lời Câu Hỏi Bổ Sung (Buổi 8)

### Câu 1: Cờ ready
**Hỏi:** Trong `useAutoPersist`, nếu bỏ điều kiện `ready` thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.

**Trả lời:**
* **Hiện tượng:** Giỏ hàng đã lưu trong thiết bị sẽ bị xóa sạch và luôn trở về trạng thái rỗng mỗi khi mở lại ứng dụng.
* **Giải thích theo thứ tự các lần render:**
  1. *Lần render đầu tiên:* State giỏ hàng trong Redux store được khởi tạo với giá trị ban đầu là mảng rỗng `[]`. Cùng lúc đó, hàm đọc bất đồng bộ `loadJSON` bắt đầu gửi yêu cầu đọc dữ liệu giỏ hàng cũ từ `AsyncStorage`, quá trình này cần một khoảng thời gian ngắn (asynchronous) để hoàn tất.
  2. *Nếu không có cờ `ready`:* `useEffect` của `useAutoPersist` sẽ được kích hoạt ngay lập tức trong lần render đầu tiên này và ghi mảng rỗng `[]` hiện tại của store đè lên khóa giỏ hàng trong `AsyncStorage`.
  3. *Hậu quả:* Đến khi `loadJSON` hoàn tất thì dữ liệu lưu trữ trước đó đã bị mảng rỗng ghi đè hoàn toàn. Cờ `ready` hoạt động như một chốt chặn điều kiện, đảm bảo chỉ bắt đầu tự động lưu khi quá trình nạp dữ liệu ban đầu hoàn tất (`ready = true`).

---

### Câu 2: Token giả
**Hỏi:** Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?

**Trả lời:**
* **Hai điểm không an toàn:**
  1. Mật khẩu được lưu dưới dạng chuỗi thuần (plaintext) trong `db.json` và việc xác thực, so khớp mật khẩu diễn ra hoàn toàn ở phía client (ứng dụng), khiến dữ liệu dễ dàng bị đọc lén hoặc can thiệp.
  2. Token được tự tạo ngẫu nhiên ở client mà không có chữ ký mã hóa bảo mật từ server (như chữ ký JWT), dẫn đến việc người dùng có thể dễ dàng làm giả token để truy cập trái phép vào tài nguyên.
* **Trong hệ thống thực tế:**
  * Việc xác thực và kiểm tra mật khẩu phải được thực hiện bởi **Server** (backend). Mật khẩu phải được mã hóa một chiều (băm - hash) bằng các thuật toán mạnh (như bcrypt, Argon2, PBKDF2) kèm muối (salt).
  * Token phải được lưu trong các phân vùng bộ nhớ an toàn cấp hệ thống như **Keychain (iOS)** hoặc **Keystore (Android)** thông qua thư viện `expo-secure-store`, không lưu trực tiếp dạng văn bản thô trong `AsyncStorage`.

---

### Câu 3: Hai effect trong CartItemRow
**Hỏi:** Thử xóa effect đồng bộ `setQty(item.quantity)`. Với thao tác nào thì số hiển thị trên nút bị lệch so với store?

**Trả lời:**
* Nếu xóa bỏ effect `setQty(item.quantity)`, số lượng hiển thị trên giao diện hàng sẽ bị lệch so với Redux store trong các trường hợp:
  1. **Khi app nạp lại dữ liệu lúc khởi động (Hydrate):** Ở lần render đầu, state cục bộ `qty` nhận giá trị mặc định của prop. Khi `usePersistence` hoàn tất việc đọc giỏ hàng từ storage và nạp vào Redux store, nếu không có effect đồng bộ thì `qty` vẫn giữ nguyên giá trị rác ban đầu thay vì cập nhật theo store.
  2. **Khi thay đổi giỏ hàng từ màn hình khác:** Ví dụ người dùng tăng/giảm số lượng từ trang Chi tiết sách, xóa sách rồi thêm lại từ Danh mục, hoặc khi bấm các tác vụ xóa/làm mới từ component cha. Lúc này `item.quantity` từ props đã đổi nhưng biến cục bộ `qty` của dòng sản phẩm vẫn giữ giá trị cũ.

---

### Câu 4: Một nguồn state (Single Source of Truth)
**Hỏi:** Nếu `HeartButton` giữ trạng thái bằng `useState` riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?

**Trả lời:**
* **Nếu sử dụng `useState` độc lập:** Mỗi nút `HeartButton` sẽ quản lý một vùng nhớ riêng rẽ. Khi người dùng bấm thả tim một cuốn sách ở danh sách ngoài trang chủ, nút tim ở trang Chi tiết cuốn sách đó (hoặc trong danh sách Yêu thích) vẫn ở trạng thái chưa thả tim (trắng/rỗng), gây ra sự không nhất quán dữ liệu trên toàn giao diện.
* **Cách Store giải quyết:** Redux hoạt động theo nguyên lý "Một nguồn chân lý duy nhất" (Single Source of Truth), tập trung toàn bộ danh sách `ids` các sách yêu thích tại một nơi. Tất cả các nút `HeartButton` trên mọi màn hình đều kết nối và quan sát chung trạng thái này qua hook `useWishlist()`. Khi có sự kiện `toggle`, store cập nhật và tự động kích hoạt render lại đồng thời tất cả các nút tim liên quan, đảm bảo trạng thái luôn đồng bộ tuyệt đối.