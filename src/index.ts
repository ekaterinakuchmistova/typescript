import { Car } from "./car";
import { Book } from "./book";

/* Задание 3: Работа с импортом и экспортом
Создайте два файла: car.ts и index.ts.
В файле car.ts создайте класс Car с методами и свойствами, описанными в задании 2.
Экспортируйте класс Car из файла car.ts.
В файле index.ts импортируйте класс Car и создайте его экземпляр. Выведите информацию о машине в консоль. */

const myCar = new Car("Toyota", "Camry", 2010);

console.log(myCar.getCarInfo()); // Вывод: "Toyota Camry, 2010"
console.log(myCar.isOlderThan(2015)); // Вывод: true
console.log(myCar.isOlderThan(2005)); // Вывод: false

/* Импортируйте класс Book из файла book.ts
Создайте экземпляр класса Book
Выведите информацию о книге
Отметьте книгу как прочитанную и выведите обновленную информацию о книге */

const myBook = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
console.log(myBook.getBookInfo());
console.log(myBook.readBook());
