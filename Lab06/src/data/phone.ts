import { ColorKey, Phone } from "../type";

 
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: "bạc",  hex: "#C9EEFA", image: require("../../assets/phones/silver.png") },
  red:    { label: "đỏ",   hex: "#E53A2F", image: require("../../assets/phones/red.png") },
  black:  { label: "đen",  hex: "#000000", image: require("../../assets/phones/black.png") },
  blue:   { label: "xanh", hex: "#2A4494", image: require("../../assets/phones/blue.png") },
};
export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"];   // thứ tự 4 ô màu
 
export const PHONES: Phone[] = [
  { id: "1", name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", price: 1790000, oldPrice: 1790000,
    rating: 5, reviewCount: 828, supplier: "Tiki Tradding", badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER, defaultColor: "blue" },
  // ... thêm các sản phẩm khác (Live 4, Star 5, Active 3, Aris Pro, Bee 3)
];
export { ColorKey };

