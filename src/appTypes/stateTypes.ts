import { type StateBookInfo, type SearchParams } from './appTypes'

// interface searchData {
//   count: number
//   booksInfo: StateBookInfo[]
//   searchParams: SearchParams
// }

export interface SeachState {
  count: number
  booksInfo: StateBookInfo[]
  searchParams: SearchParams
}
