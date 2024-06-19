"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    getBookInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    }
    //readBook(): устанавливает свойство isRead в значение true.
    readBook() {
        return (this.isRead = true);
    }
    //unreadBook(): устанавливает свойство isRead в значение false.
    unReadBook() {
        return (this.isRead = false);
    }
}
exports.Book = Book;
