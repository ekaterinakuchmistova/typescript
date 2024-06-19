class Person {
    firstName: string;
    lastName: string;
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

const person = new Person('John', 'Doe', 30);
console.log(` Full name: ${person.getFullName()}, Age: ${person.age}`);

export { Person };

