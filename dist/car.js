"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    getCarInfo() {
        return `${this.brand} ${this.model}, ${this.year}`;
    }
    isOlderThan(year) {
        return this.year < year;
    }
}
exports.Car = Car;
