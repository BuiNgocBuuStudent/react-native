export class Car{
    brand: string
    model: string
    year: number

    constructor(brand: string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayInfo(): void{
        console.log("Brand: " + this.brand)
        console.log("Model: " + this.model)
        console.log("Year: " + this.year)
    }
}

const car = new Car("Toyota", "DRF", 2005);
car.displayInfo()