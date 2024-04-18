//* any
let flexible: any = 4
flexible = 'Download some more ram'
flexible = window.document
flexible = setTimeout

flexible.it.is.possible.to.access.any.deep.property

console.log(window, Promise, setTimeout, 'foo')

// unknown

let flexible2: unknown = 4
flexible2 = 'Download some more ram'
flexible2 = window.document
flexible2 = setTimeout

let myUnknown: unknown = 14
myUnknown.it.is.possible.to.access.any.deep.property //✔️ Fails as it should

// This code runs for myUnknown = { all possible values }
if (typeof myUnknown === 'string') {
  // This code runs for myUnknown = { all strings }
  myUnknown
  //     ^?
} else if (typeof myUnknown === 'number') {
  // This code runs for myUnknown = { all numbers }
  myUnknown
  //     ^?
} else {
  myUnknown
  // ^?
  // this would run for "the leftovers"
  //       myUnknown = { anything except string or numbers }
// }

//* Practical use of top types

function doSomethingRisky() {
  if (Math.random() > 0.5) return 'ok'
  else if (Math.random() > 0.5) throw new Error('Bad luck!')
  else throw 'Really bad luck' // <-- Don't do this, don't throw strings
}

try {
  doSomethingRisky()
// } catch (e: unknown) { // flag enabled in tsconfig.json so we don't need to put unknown anymore  
} catch (e) { 
  if (e instanceof Error) {
    e
    //   ^?
  } else if (typeof e === 'string') {
    e
    //   ^?
  } else {
    // Last resort
    console.error(e)
    //                 ^?
  }
}

//* Almost top type: object

let val: object = { status: 'ok' }
val = 'foo' //! string is not an object
val = null //! null is not an object
val = () => 'ok' //✔️ functions are objects

// The type of this value cannot be modeled by an interface
let response = //     ^?
{ success: 'ok', data: [] } as { success: string; data: unknown } | { error: string; code: number } 
  

val = response

//* Almost top type: {}

const stringOrNumber: string | number = 4
let nullableString: string | null = null
const myObj: {
  a?: number
  b: string
} = { b: 'foo' }

let val2: {} = 4
val2 = 'abc'
val2 = new Date()
val2 = stringOrNumber
val2 = nullableString // null is not assignable
val2 = myObj.a // undefined is not assignable to empty object type


//? Adding in null and undefined, and we're back to a top type
let withoutUndefined: {} | null = 37
let withUndefined: {} | null | undefined = 38
let anUnknown: unknown = '42'

withoutUndefined = anUnknown //! unknown is not assignable to {}
withUndefined = anUnknown //✔️ OK

type NullableStringOrNumber = string | number | null | undefined
type StringOrNumber = NullableStringOrNumber & {} // ✔️ remove the null and undefined

//* Bottom type: never

function obtainRandomVehicle(): any {
  return {} as any
}

class Car {
  drive() {
    console.log('vroom')
  }
}
class Truck {
  tow() {
    console.log('dragging something')
  }
}
    class Boat {
  isFloating() {
    return true
  }
}
    type Vehicle = Truck | Car | Boat
    class UnreachableError extends Error {
  constructor(_nvr: never, message: string) { // never type as argument and a message string
    super(message)
  }
}

let myVehicle: Vehicle = obtainRandomVehicle()

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow() // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive() // Car
} else if (myVehicle instanceof Boat) {
  myVehicle.isFloating() // Boat
} else {
  // NEITHER!
    const neverValue: never = myVehicle // never is the type for myVehicle
    throw new UnreachableError(
  myVehicle,
  `Unexpected vehicle type: ${myVehicle}`,
)
}


//? Add Boat



//? Unreachable Error




//* Unit Types

//? null and undefined
let myNull: null = null
let myUndefined: undefined = undefined

myNull = undefined
myUndefined = null

//? void
let myVoid: void = (function() {})()// invoking a void-returning IIFE

myVoid = undefined
myVoid = null

myUndefined = myVoid
myNull = myVoid

/**/


export default {}
