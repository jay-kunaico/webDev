import { fetchRecord, fetchRecords } from './lib/registry'

async function main() {
  //open interface allowing us to inject something into an interface.
  // type Foo = keyof DataTypeRegistry & string
  const myBook = await fetchRecord('book', 'book_123')
  const myMagazine = await fetchRecord('magazine', 'magazine_123')
  const myAudiobook = await fetchRecord('audiobook', 'audiobook_123')
  const myBookList = await fetchRecords('book', ['book_123'])
  const myMagazineList = await fetchRecords('magazine', [
    'magazine_123',
  ])

  //@ts-expect-erro  r
  fetchRecord('book', 'book_123')
  //@ts-expect-error
  fetchRecord('magazine', 'mag_123')
  //@ts-expect-error
  fetchRecords('book', ['booooook_123'])
  //@ts-expect-error
  fetchRecords('magazine', ['maaaag_123'])
}
