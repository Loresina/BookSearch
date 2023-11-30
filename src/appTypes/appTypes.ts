// interface ValueObject {
//   property1: string
//   property2: number
// }

// type ValueType = string | string[] | ValueObject[] | ValueObject

// type BookInfo = Record<string, string | ValueType>

// type BookInfo = Record<string, ValueType>

interface RespItem {
  volumeInfo: StateBookInfo
}

interface StateBookInfo {
  title: string
  authors: string[]
  description: string
  categories: string[]
  imageLinks: { smallThumbnail: string, thumbnail: string }
}

interface SearchParams {
  seachTitle: string
  categories: string
  sorting: string
  loadStartIndex: number
}

export type { RespItem, StateBookInfo, SearchParams }
