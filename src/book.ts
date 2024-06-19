class Book {
  title: string;
  author: string;
  pages: number;
  isRead: boolean;

  constructor(title: string, author: string, pages: number, isRead: boolean) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  getBookInfo(): string {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }

  //readBook(): устанавливает свойство isRead в значение true.
  readBook(): boolean {
    return (this.isRead = true);
  }
  //unreadBook(): устанавливает свойство isRead в значение false.

  unReadBook(): boolean {
    return (this.isRead = false);
  }
}

export { Book };
