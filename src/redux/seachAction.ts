import { UserActionTypes } from './types/typesActions'
import type { StateBookInfo, SearchParams } from '../appTypes/appTypes'

interface LoginAction {
  type: UserActionTypes.BOOK_STORE
  payload: { count: number, mainMessage: string, booksInfo: StateBookInfo[], searchParams: SearchParams }
}

export const seachResult = (searchData: { count: number, mainMessage: string, booksInfo: StateBookInfo[], searchParams: SearchParams }): LoginAction => ({
  type: UserActionTypes.BOOK_STORE,
  payload: searchData
})

export type UserActions = LoginAction
