export interface DataTypeRegistry {
  // empty by design
}
// the "& string" is just a trick to get
// a nicer tooltip to show you in the next step
// interesection type and forces the fetchRecord to the types in the DataTypeRegistry
export function fetchRecord<K extends keyof DataTypeRegistry>(
  // arg: keyof DataTypeRegistry & string,
  // By adding the K extends we can now say our arg is of type K
  arg: K,
  // id: string,
  id: `${K}_${string}`,
  // to return, we know we can use an indexed access type here
): DataTypeRegistry[K] {
  // not actually returning anything just making TypeScript happy
  return {} as any
}
// do the same as above, add etends and change arg: key of DataTypeRegistry to just K
// note the plural
export function fetchRecords<K extends keyof DataTypeRegistry>(
  // arg: keyof DataTypeRegistry & string,
  arg: K,
  ids: `${K}_${string}`[],
): DataTypeRegistry[K][] {
  return {} as any
}
