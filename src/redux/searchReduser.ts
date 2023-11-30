import { UserActionTypes } from './types/typesActions'
import type { SeachState } from '../appTypes/stateTypes'
import type { UserActions } from './seachAction'

const initialState: SeachState = {
  count: 0,
  booksInfo: [{
    title: '',
    authors: [],
    description: '',
    categories: [],
    imageLinks: { smallThumbnail: '', thumbnail: '' }
  }],
  searchParams: {
    seachTitle: '',
    categories: '',
    sorting: '',
    loadStartIndex: 0
  }
}

export const searchReducer = (state = initialState, action: UserActions): SeachState => {
  switch (action.type) {
    case UserActionTypes.BOOK_STORE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
