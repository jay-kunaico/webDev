//* Classes

//? Field types
class Car {
  // static nextSerialNumber = 100
  // static generateSerialNumber() { return this.nextSerialNumber++ }
  // private static nextSerialNumber: number
  // private static generateSerialNumber() {
  static #nextSerialNumber: number
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
  }

  make: string
  model: string
  year: number
  // serialNumber = Car.generateSerialNumber()
  // only instances of this field can view this
  readonly #serialNumber = Car.#generateSerialNumber()
  protected get serialNumber() {
    return this.#serialNumber
  }
  static {
    // `this` is the static scope
    fetch('https://api.example.com/vin_number_data')
      .then((response) => response.json())
      .then((data) => {
        this.#nextSerialNumber = data.mostRecentInvoiceId + 1
      })
  }
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    //     ^?
    this.year = year
  }
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
  getLabel() {
    return ` ${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
  equals(other: unknown) {
    if (other &&
      typeof other === 'object' &&
      #serialNumber in other) {
      other
      //       ^?
      return other.#serialNumber === this.#serialNumber
    }
    return false
  }
}
const c2 = c1
c2.equals(c1)  
}

let sedan = new Car('Honda', 'Accord', 2017)
sedan.activateTurnSignal('left') //! not safe!
new Car(2017, 'Honda', 'Accord') //! not safe!

//? method types
// honk(duration: number): string {
//     return `h${'o'.repeat(duration)}nk`;
//  }
const c = new Car('Honda', 'Accord', 2017)
c.honk(5) // "hooooonk"

//? static member fields

// getLabel() {
// return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
// }

console.log(new Car('Honda', 'Accord', 2017))
// > "Honda Accord 2017 - #100
console.log(new Car('Toyota', 'Camry', 2022))
// > "Toyota Camry 2022 - #101

//? static blocks
// static {
//     // `this` is the static scope
//     fetch("https://api.example.com/vin_number_data")
//         .then(response => response.json())
//         .then(data => {
//             this.nextSerialNumber = data.mostRecentInvoiceId + 1;
//         })
// }
serialNumber = Car.generateSerialNumber()

//* Access modifier keywords

//? on member fields

const s = new Sedan('Nissan', 'Altima', 2020)
s.#serialNumber

//? on static fields

Car.generateSerialNumber()

//* JS private #fields
//? member fields
// #serialNumber = Car.generateSerialNumber()
c.#serialNumber

//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

//* Private field presence checks

// equals(other: unknown) {
//     if (other &&
//       typeof other === 'object' &&
//       #serialNumber in other) {
//         other
// //       ^?
//         return other.#serialNumber = this.#serialNumber
//       }
//       return false
//   }
// const c2 = c1
// c2.equals(c1)

//* readonly

// readonly #serialNumber = Car.#generateSerialNumber()
// changeSerialNumber(num: number) {
//     this.#serialNumber = num
// }

//* Parameter properties

// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}

class Base {}

class Car2 extends Base {
  foo = console.log("class field initializer")
  constructor(public make: string) {
    super()
    console.log("custom constructor stuff")
  }
}

//* Overrides


class Truck extends Car {
    override honk() { // OOPS!
      console.log("BEEP")
      return "BEEP"
    }
}

const t = new Truck("Ford", "F-150", 2020);
t.honk(); // "beep"

//? override keyword
override honk() { // OOPS!

//? noImplicitOverride
"noImplicitOverride": true

/**/
export default {}
