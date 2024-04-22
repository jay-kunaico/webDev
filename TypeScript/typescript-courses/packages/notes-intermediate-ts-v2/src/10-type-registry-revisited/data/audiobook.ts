// create a new file to define a class representing a new record type

export class Audiobook {
  durationInMinutes(): number {
    return 42
  }
}

// Register book in the datatyperegistry
// add type information as if it were defined in another file
declare module '../lib/registry' {
  // only one DataTypeRegistry
  // any modification will update everywhere the type is used
  export interface DataTypeRegistry {
    audiobook: Audiobook
  }
}
