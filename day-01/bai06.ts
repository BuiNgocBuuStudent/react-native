// Tạo class Book để biểu diễn thông tin của một quyển sách
class Book {
    title: string;
    author: string;
        year: number;

    // Constructor được gọi khi tạo một đối tượng Book mới
    // name: tên sách
    // author: tác giả
    // year: năm xuất bản
    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

const book = new Book(
    "Harry Potter",
    "J. K. Rowling",
    1997
);

// In thông tin của quyển sách ra màn hình
console.log("Tên sách:", book.title);
console.log("Tác giả:", book.author);
console.log("Năm xuất bản:", book.year);
