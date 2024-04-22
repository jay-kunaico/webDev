export class Magazine {
  issueNumber(): number {
    return 42
  }
}

// Register book in the datatyperegistry
// add type information as if it were defined in another file
declare module '../lib/registry' {
  export interface DataTypeRegistry {
    magazine: Magazine
  }
}
