"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const car_1 = require("./car");
const book_1 = require("./book");
const myCar = new car_1.Car("Toyota", "Camry", 2010);
console.log(myCar.getCarInfo()); // Вывод: "Toyota Camry, 2010"
console.log(myCar.isOlderThan(2015)); // Вывод: true
console.log(myCar.isOlderThan(2005)); // Вывод: false
// Импортируйте класс Book из файла book.ts
// Создайте экземпляр класса Book
// Выведите информацию о книге
// Отметьте книгу как прочитанную и выведите обновленную информацию о книге
const myBook = new book_1.Book("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
console.log(myBook.getBookInfo());
console.log(myBook.readBook());
