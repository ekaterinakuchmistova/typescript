/* Задание 2: Создание класса Car
Создайте класс Car с тремя свойствами: make, model, year.
Используйте конструктор для инициализации этих свойств.
Добавьте метод getCarInfo, который возвращает строку с информацией о машине.
Создайте экземпляр класса Car и выведите информацию о машине в консоль. */

class Car {
   private brand: string;
    model: string;
    year: number;
    
    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    getCarInfo(): string {
        return `${this.brand} ${this.model}, ${this.year}`;
    }

    isOlderThan(year: number): boolean {
        return this.year < year;
    }
}

export { Car };