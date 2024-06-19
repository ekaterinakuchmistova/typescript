"use strict";
class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    isAdult() {
        return this.age >= 18;
    }
}
// Пример использования
const person = new Person('John', 'Doe', 25);
console.log(person.getFullName()); // Вывод: "John Doe"
console.log(person.isAdult()); // Вывод: true
