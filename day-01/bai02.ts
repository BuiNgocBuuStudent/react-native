import {Person} from "./bai01"

class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string){
        super(name, age)
        this.grade = grade
    }

    displayInfo(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Grade: ${this.grade}`);
    }
}

const student = new Student("Bui Ngoc Buu", 25, "DHKTPM19B")
// student.displayInfo()