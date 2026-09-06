// Câu 1
// Giải thích:
// - Promise là một đối tượng đại diện cho một giá trị có thể chưa có ngay lập tức
//   mà sẽ có trong tương lai (hoặc thất bại).
// - Promise nhận vào một callback với 2 tham số: resolve (thành công) và reject (thất bại).
// - setTimeout() được dùng để trì hoãn việc thực thi, ở đây là 2000ms = 2 giây.
// - Khi gọi resolve("Hello Async"), Promise chuyển sang trạng thái "fulfilled"
//   và trả về giá trị "Hello Async".
// - .then() được dùng để xử lý kết quả khi Promise thành công.
const cau1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
};
// Gọi hàm và in kết quả
cau1().then((result) => console.log("Câu 1:", result));


// Câu 2
// Giải thích:
// - Tương tự câu 1, nhưng lần này resolve với giá trị là number (số 10).
// - Promise<number> chỉ định kiểu dữ liệu trả về là number (TypeScript generic).
// - setTimeout delay 1000ms = 1 giây trước khi resolve.
// - Khi Promise fulfilled, .then() nhận được giá trị 10 và in ra console.
const cau2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
};
cau2().then((result) => console.log("Câu 2:", result));


// Câu 3
// Giải thích:
// - reject() được dùng khi muốn Promise thất bại (trạng thái "rejected").
// - Khi gọi reject("Something went wrong"), Promise chuyển sang trạng thái rejected.
// - .catch() được dùng để bắt lỗi khi Promise bị reject.
// - Nếu không có .catch(), lỗi sẽ không được xử lý và gây ra "Unhandled Promise Rejection".
// - Trong thực tế, reject thường được dùng khi gọi API thất bại, lỗi mạng, dữ liệu không hợp lệ,...
const cau3 = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
};
cau3().catch((error) => console.log("Câu 3:", error));

// Câu 4
// Giải thích:
// - Math.random() trả về số thực ngẫu nhiên từ 0 đến 1 (không bao gồm 1).
// - Math.floor() làm tròn xuống số nguyên gần nhất.
// - Math.random() * 100 → số ngẫu nhiên từ 0 đến 99.
// - Nếu số ngẫu nhiên >= 50, Promise resolve (thành công) → .then() xử lý.
// - Nếu số ngẫu nhiên < 50, Promise reject (thất bại) → .catch() xử lý.
// - Đây là pattern phổ biến: xử lý cả 2 trường hợp thành công và thất bại.
const cau4 = () => {
    return new Promise((resolve, reject) => {
        const randomNum = Math.floor(Math.random() * 100);
        if (randomNum >= 50) {
            resolve(randomNum); // Thành công nếu số >= 50
        }
        else {
            reject(`Số ${randomNum} nhỏ hơn 50, thất bại!`); // Thất bại nếu số < 50
        }
    });
};
// .then() xử lý khi thành công, .catch() xử lý khi thất bại
cau4()
    .then((result) => console.log("Câu 4 - Thành công:", result))
    .catch((error) => console.log("Câu 4 - Lỗi:", error));


// Câu 5
// Giải thích:
// - Hàm nhận tham số time (kiểu number) là thời gian delay tính bằng milliseconds.
// - Đây là ví dụ về hàm có tham số linh hoạt, giả lập tác vụ bất đồng bộ.
// - Trong thực tế, hàm này giống như việc giả lập gọi API, đọc file, truy vấn database,...
// - Promise sẽ resolve sau đúng khoảng thời gian time ms.
// - Hàm này sẽ được tái sử dụng ở câu 6 và câu 7.
const simulateTask = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
};
// Gọi hàm với 1500ms (1.5 giây)
simulateTask(1500).then((result) => console.log("Câu 5:", result));

// Câu 6
// Giải thích:
// - Promise.all() nhận vào một mảng các Promise và chạy tất cả ĐỒNG THỜI (parallel).
// - Nó trả về một Promise mới, resolve khi TẤT CẢ Promise trong mảng đều resolve.
// - Kết quả trả về là một mảng chứa giá trị của từng Promise theo đúng thứ tự.
// - Nếu BẤT KỲ Promise nào reject, Promise.all() sẽ reject ngay lập tức.
// - Ưu điểm: Chạy song song => tiết kiệm thời gian so với chạy tuần tự.
//   Ví dụ: 3 task (1s, 2s, 3s) chạy song song chỉ mất ~3s thay vì 6s.
// - Trong React Native, dùng khi cần gọi nhiều API cùng lúc rồi tổng hợp kết quả.
const cau6 = () => {
    const task1 = simulateTask(1000); // Task 1: 1 giây
    const task2 = simulateTask(2000); // Task 2: 2 giây
    const task3 = simulateTask(3000); // Task 3: 3 giây
    Promise.all([task1, task2, task3]).then((results) => {
        console.log("Câu 6 - Tất cả hoàn thành:", results);
        // Kết quả: ["Task done", "Task done", "Task done"]
    });
};
cau6();

// Câu 7
// Giải thích:
// - Promise.race() nhận vào mảng các Promise, nhưng khác với Promise.all():
//   nó chỉ trả về kết quả của Promise NÀO HOÀN THÀNH ĐẦU TIÊN (nhanh nhất).
// - Các Promise còn lại vẫn chạy nhưng kết quả bị bỏ qua.
// - Ứng dụng thực tế: timeout cho API call, chọn server phản hồi nhanh nhất,...
// - Ở đây, task 500ms sẽ resolve trước → Promise.race() trả về "Task done" từ task này.
const cau7 = () => {
    const fastTask = simulateTask(500); // Nhanh nhất: 500ms
    const mediumTask = simulateTask(1500); // Trung bình: 1500ms
    const slowTask = simulateTask(3000); // Chậm nhất: 3000ms
    Promise.race([fastTask, mediumTask, slowTask]).then((result) => {
        console.log("Câu 7 - Promise nhanh nhất:", result);
        // Kết quả: "Task done" (từ fastTask 500ms)
    });
};
cau7();

// Giải thích:
// - Promise chaining (chuỗi Promise) cho phép thực hiện các bước tuần tự.
// - Mỗi .then() nhận kết quả từ .then() trước đó và trả về giá trị mới.
// - Luồng xử lý: 2 => bình phương (2² = 4) => nhân đôi (4 × 2 = 8) => cộng 5 (8 + 5 = 13).
// - Promise.resolve(2) tạo một Promise đã resolve sẵn với giá trị 2.
// - Đây là pattern rất phổ biến khi cần xử lý dữ liệu qua nhiều bước,
//   ví dụ: lấy userId → lấy thông tin user → lấy danh sách bài viết.
const cau8 = () => {
    Promise.resolve(2)
      .then((num) => {
        console.log("Câu 8 - Bước 1 (bình phương):", num, "->", num * num);
        return num * num; // 2² = 4
      })
      .then((num) => {
        console.log("Câu 8 - Bước 2 (nhân đôi):", num, "->", num * 2);
        return num * 2; // 4 × 2 = 8
      })
      .then((num) => {
        console.log("Câu 8 - Bước 3 (cộng 5):", num, "->", num + 5);
        return num + 5; // 8 + 5 = 13
      })
      .then((finalResult) => {
        console.log("Câu 8 - Kết quả cuối cùng:", finalResult); // 13
      });
  };
  cau8();

// Câu 9:
// Giải thích:
// - Promise giả lập việc đọc dữ liệu (giống gọi API lấy danh sách số).
// - setTimeout 1000ms giả lập thời gian chờ đọc dữ liệu.
// - Sau khi resolve mảng gốc, dùng .then() để xử lý dữ liệu.
// - Array.filter() tạo mảng mới chỉ chứa các phần tử thỏa điều kiện.
// - num % 2 === 0: kiểm tra số chẵn (chia 2 dư 0 → số chẵn).
// - Trong React Native, pattern này dùng khi fetch API rồi lọc dữ liệu hiển thị.
const cau9 = () => {
    const readArray = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            }, 1000);
        });
    };
    readArray()
        .then((numbers) => {
        console.log("Câu 9 - Mảng gốc:", numbers);
        // Lọc ra các số chẵn bằng filter
        const evenNumbers = numbers.filter((num) => num % 2 === 0);
        return evenNumbers;
    })
        .then((evenNumbers) => {
        console.log("Câu 9 - Số chẵn:", evenNumbers);
        // Kết quả: [2, 4, 6, 8, 10]
    });
};
cau9();


// Câu 10
// Giải thích:
// - .finally() được gọi khi Promise kết thúc, BẤT KỂ thành công hay thất bại.
// - Nó không nhận tham số (không biết Promise resolve hay reject).
// - Thứ tự thực thi: .then() hoặc .catch() → .finally().
// - Ứng dụng thực tế:
//   + Tắt loading spinner sau khi API call hoàn thành.
//   + Đóng kết nối database.
//   + Giải phóng tài nguyên (cleanup).
// - Ví dụ dưới đây test cả 2 trường hợp: thành công và thất bại,
//   cả hai đều log "Done" ở cuối nhờ .finally().
// Trường hợp 1: Promise THÀNH CÔNG
const cau10_success = () => {
    const successPromise = new Promise((resolve) => {
        setTimeout(() => resolve("Thành công!"), 500);
    });
    successPromise
        .then((result) => console.log("Câu 10a - Kết quả:", result))
        .catch((error) => console.log("Câu 10a - Lỗi:", error))
        .finally(() => console.log("Câu 10a - Done (luôn chạy dù thành công)"));
};
// Trường hợp 2: Promise THẤT BẠI
const cau10_failure = () => {
    const failPromise = new Promise((_, reject) => {
        setTimeout(() => reject("Thất bại!"), 500);
    });
    failPromise
        .then((result) => console.log("Câu 10b - Kết quả:", result))
        .catch((error) => console.log("Câu 10b - Lỗi:", error))
        .finally(() => console.log("Câu 10b - Done (luôn chạy dù thất bại)"));
};
cau10_success();
cau10_failure();

// Câu 11: Chuyển đổi câu 1 sang dạng async/await
// ============================================================
// Giải thích:
// - async/await là cú pháp hiện đại giúp viết code bất đồng bộ TRÔNG GIỐNG code đồng bộ.
// - Từ khóa "async" đặt trước function để khai báo hàm bất đồng bộ.
// - Từ khóa "await" dùng BÊN TRONG hàm async, nó sẽ "đợi" Promise resolve
//   rồi mới thực thi dòng tiếp theo (thay vì dùng .then()).
// - Hàm async LUÔN trả về một Promise, dù bạn return giá trị thường.
// - Ở đây, await cau1() sẽ đợi Promise từ câu 1 resolve xong mới gán vào biến result.
// - So với .then(), async/await giúp code dễ đọc hơn, đặc biệt khi có nhiều bước tuần tự.
const cau11 = async() => {
    const result = await cau1(); // Đợi Promise resolve, nhận giá trị "Hello Async"
    console.log("Câu 11:", result);
  };
cau11();

// Câu 12
// Giải thích:
// - Hàm async gọi simulateTask(2000) đã tạo ở câu 5.
// - await simulateTask(2000) sẽ đợi 2 giây cho đến khi Promise resolve "Task done".
// - Sau khi resolve, giá trị được gán vào biến result và in ra console.
// - Không cần dùng .then() → code ngắn gọn, dễ hiểu hơn.
// - Trong React Native, async/await thường dùng trong useEffect hoặc event handler
//   để gọi API, đọc AsyncStorage, truy vấn database,...
const cau12 = async () => {
    const result = await simulateTask(2000); // Đợi 2 giây
    console.log("Câu 12:", result);
  };
  cau12();

// Câu 13
// Giải thích:
// - Khi dùng async/await, KHÔNG dùng .catch() mà dùng try/catch để bắt lỗi.
// - try { ... }: khối code có thể gây ra lỗi (Promise reject).
// - catch (error) { ... }: khối code xử lý lỗi nếu Promise bị reject.
// - Nếu await gặp Promise reject, nó sẽ THROW lỗi → nhảy vào catch.
// - Ở đây, cau3() là hàm reject "Something went wrong" từ phần A.
// - try/catch giúp code sạch sẽ hơn so với chuỗi .then().catch() dài dòng.
// - Trong React Native, dùng try/catch khi gọi API để xử lý lỗi mạng, server lỗi,...
const cau13 = async () => {
    try {
      const result = await cau3(); // Promise reject → throw error
      console.log("Câu 13:", result); // Dòng này KHÔNG chạy vì lỗi xảy ra ở trên
    } catch (error) {
      console.log("Câu 13 - Bắt lỗi:", error); // "Something went wrong"
    }
  };
  cau13();

// Câu 14
// Giải thích:
// - Hàm async nhận tham số num (kiểu number).
// - Bên trong, tạo Promise mới delay 1 giây rồi resolve với num * 3.
// - await đợi Promise resolve, sau đó return kết quả.
// - Hàm async luôn trả về Promise, nên kiểu trả về là Promise<number>.
// - Khi gọi hàm, dùng await hoặc .then() để lấy kết quả.
// - Ví dụ thực tế: gửi số lên server, đợi server xử lý, nhận kết quả trả về.
const cau14 = async (num) => {
    const result = await new Promise((resolve) => {
    setTimeout(() => {
    resolve(num * 3); // Nhân 3 sau 1 giây
    }, 1000);
    });
    
    return result;
    };
    
    // Gọi hàm và in kết quả
    (async () => {
    const result = await cau14(7); // 7 × 3 = 21
    console.log("Câu 14:", result);
    })();

// Câu 15
// Giải thích:
// - Khi đặt nhiều await liên tiếp, các hàm async sẽ chạy TUẦN TỰ (sequential).
// - Task 1 chạy xong → Task 2 mới bắt đầu → Task 2 xong → Task 3 mới bắt đầu.
// - Tổng thời gian = tổng thời gian của tất cả task (1s + 1.5s + 0.5s = 3s).
// - Ưu điểm: đảm bảo thứ tự thực thi, task sau có thể dùng kết quả của task trước.
// - Nhược điểm: chậm hơn chạy song song nếu các task độc lập.
// - Dùng khi: các bước phụ thuộc nhau, ví dụ: login → lấy token → gọi API.
const cau15 = async () => {
    console.log("Câu 15 - Bắt đầu chạy tuần tự...");
  
    const result1 = await simulateTask(1000); // Đợi 1 giây
    console.log("Câu 15 - Task 1:", result1);
  
    const result2 = await simulateTask(1500); // Đợi thêm 1.5 giây
    console.log("Câu 15 - Task 2:", result2);
  
    const result3 = await simulateTask(500); // Đợi thêm 0.5 giây
    console.log("Câu 15 - Task 3:", result3);
  
    console.log("Câu 15 - Hoàn thành tất cả (tuần tự ~3s)");
  };
  cau15();
    
  // Câu 16
// Giải thích:
// - Khác với câu 15 (tuần tự), ở đây các task chạy SONG SONG (parallel).
// - Promise.all() kết hợp với await để đợi TẤT CẢ task hoàn thành cùng lúc.
// - Tổng thời gian = thời gian của task CHẬM NHẤT (chứ không phải tổng).
//   Ví dụ: 3 task (1s, 2s, 1.5s) → chỉ mất ~2s thay vì 4.5s.
// - Destructuring [r1, r2, r3] lấy kết quả từng task theo thứ tự.
// - Dùng khi: các task KHÔNG phụ thuộc nhau, ví dụ: gọi 3 API khác nhau cùng lúc.
// - Chú ý: Nếu BẤT KỲ task nào reject, Promise.all() reject ngay → cần try/catch.
const cau16 = async () => {
    console.log("Câu 16 - Bắt đầu chạy song song...");
  
    // Khởi tạo tất cả task cùng lúc (KHÔNG có await ở đây)
    const [r1, r2, r3] = await Promise.all([
      simulateTask(1000), // Task 1: 1 giây
      simulateTask(2000), // Task 2: 2 giây
      simulateTask(1500), // Task 3: 1.5 giây
    ]);
  
    console.log("Câu 16 - Kết quả:", r1, r2, r3);
    console.log("Câu 16 - Hoàn thành tất cả (song song ~2s)");
  };
  cau16();
  

// Câu 17: 
// Giải thích:
// - for await...of là vòng lặp dành riêng cho iterable bất đồng bộ.
// - Nó duyệt qua từng phần tử trong mảng Promise, đợi resolve rồi mới xử lý.
// - Khác với Promise.all(): for await...of xử lý TUẦN TỰ từng Promise một.
// - Mỗi lần lặp, await sẽ đợi Promise hiện tại resolve trước khi chuyển sang cái tiếp theo.
// - Ứng dụng: xử lý danh sách tác vụ theo thứ tự, stream dữ liệu từ server.
// - Lưu ý: Mảng promises đã được khởi tạo nên các Promise bắt đầu chạy ngay,
//   nhưng for await...of sẽ nhận kết quả theo thứ tự của mảng.
const cau17 = async () => {
    const simulateTask = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Task done");
            }, time);
        });
    };
    
    // Tạo mảng các Promise với thời gian khác nhau
    const promises = [
      simulateTask(1000), // 1 giây
      simulateTask(500), // 0.5 giây
      simulateTask(1500), // 1.5 giây
    ];
  
    console.log("Câu 17 - Bắt đầu duyệt mảng Promise...");
    let index = 0;
    for await (const result of promises) {
      index++;
      console.log(`Câu 17 - Promise ${index}:`, result);
    }
    console.log("Câu 17 - Duyệt xong tất cả!");
  };
  cau17();

// Câu 18:
// Giải thích:
// - Đây là ví dụ giả lập gọi API phổ biến trong React Native (fetch, axios).
// - Hàm nhận tham số id (kiểu number) đại diện cho ID của user.
// - Sau 1 giây (giả lập thời gian mạng), Promise resolve với object user.
// - Interface User định nghĩa kiểu dữ liệu cho object trả về (TypeScript).
// - Trong thực tế, thay setTimeout bằng fetch("https://api.example.com/users/" + id).
// - async/await giúp code gọn gàng khi xử lý response từ API.
const fetchUser = async (id) => {
    return new Promise((resolve) => {
    setTimeout(() => {
    resolve({
        id: id,
        name: `User_${id}`,
        email: `user${id}@example.com`,
    });
    }, 1000); // Giả lập delay mạng 1 giây
    });
    };
    
    // Gọi hàm và in kết quả
    (async () => {
    const user = await fetchUser(42);
    console.log("Câu 18 - User:", user);
    })();
    
// Câu 19
// Giải thích:
// - Hàm nhận mảng các ID và gọi fetchUser() cho TỪNG ID.
// - Dùng Promise.all() kết hợp map() để gọi TẤT CẢ request song song.
// - ids.map(id => fetchUser(id)): tạo mảng Promise từ mảng ID.
// - Promise.all() đợi tất cả Promise resolve, trả về mảng User[].
// - So với dùng vòng for + await (tuần tự), cách này NHANH HƠN nhiều
//   vì tất cả API call chạy đồng thời.
// - Ví dụ: 5 user, mỗi call 1s → song song chỉ mất ~1s thay vì 5s.
// - Trong React Native, dùng khi cần load danh sách user, sản phẩm,...
const fetchUsers = async (ids) => {
    // Tạo mảng Promise bằng map, sau đó đợi tất cả bằng Promise.all
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    return users;
    };
    
    // Gọi hàm với mảng 3 ID
    (async () => {
    const users = await fetchUsers([1, 2, 3]);
    console.log("Câu 19 - Danh sách users:");
    users.forEach((user) =>
    console.log(`- ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`),
    );
    })();


 // Câu 20: Thêm timeout - nếu API call quá 2 giây thì throw error
// ============================================================
// Giải thích:
// - Đây là pattern "Race with Timeout" rất phổ biến trong thực tế.
// - Promise.race() được dùng để "đua" giữa API call thật và timeout Promise.
// - Nếu API call resolve TRƯỚC timeout → trả về kết quả bình thường.
// - Nếu timeout resolve TRƯỚC API call → reject với lỗi "Request timed out".
// - timeoutMs: thời gian tối đa cho phép (mặc định 2000ms = 2 giây).
// - Hàm này wrap fetchUser() với cơ chế timeout, giúp tránh treo ứng dụng.
// - Trong React Native, timeout rất quan trọng khi gọi API:
//   + Mạng chậm hoặc mất kết nối → không để user đợi vô hạn.
//   + Hiển thị thông báo lỗi thân thiện khi request quá lâu.
const fetchUserWithTimeout = async (
id,
timeoutMs = 2000,
) => {
// Tạo Promise timeout - reject sau timeoutMs milliseconds
const timeoutPromise = new Promise((_, reject) => {
setTimeout(() => {
reject(new Error(`Request timed out after ${timeoutMs}ms`));
}, timeoutMs);
});

// Race giữa fetchUser thật và timeout
// Promise nào hoàn thành trước sẽ "thắng"
return Promise.race([fetchUser(id), timeoutPromise]);
};

// Test trường hợp 1: Timeout 3 giây → fetchUser (1s) thắng → THÀNH CÔNG
(async () => {
try {
const user = await fetchUserWithTimeout(10, 3000); // Timeout 3s > API 1s
console.log("Câu 20a - Thành công:", user);
} catch (error) {
console.log("Câu 20a - Lỗi:", error.message);
}
})();

// Test trường hợp 2: Timeout 500ms → timeout thắng → THẤT BẠI
(async () => {
try {
const user = await fetchUserWithTimeout(20, 500); // Timeout 0.5s < API 1s
console.log("Câu 20b - Thành công:", user);
} catch (error) {
console.log("Câu 20b - Lỗi:", error.message);
// "Request timed out after 500ms"
}
})();

  