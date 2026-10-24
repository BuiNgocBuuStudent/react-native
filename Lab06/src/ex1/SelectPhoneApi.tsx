import React, { useState, useEffect, useCallback } from "react";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { fetchPhone } from "../phone/phoneApi";
import { Phone } from "../type";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1: Reset trạng thái trước khi fetch
    setError(null);
    setPhone(null);

    // TODO 2: Gọi fetchPhone("1") và bắt lỗi
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      setError(e?.message || "Đã xảy ra lỗi không xác định");
    }
  }, []);

  // TODO 3: useEffect gọi load() khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: Nếu có lỗi -> hiển thị ErrorBox có nút Thử lại
  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  // TODO 5: Nếu chưa có phone (đang tải) -> hiển thị Loading
  if (!phone) {
    return <Loading />;
  }

  // TODO 6: Đã có dữ liệu -> hiển thị lại giao diện Bài 1
  return <SelectPhoneApp phone={phone} />;
}