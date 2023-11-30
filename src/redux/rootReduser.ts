import { combineReducers } from 'redux'
import { searchReducer } from './searchReduser'

const rootReducer = combineReducers({
  search: searchReducer
  // другие редьюсеры
})

// ReturnType - это утилита TS, которая используется для извлечения типа возвращаемого значения функции
// В данном случае - это полное состояние хранилища, которое генерирует Redux

// В итоге, AppState используется для предоставления полного типа состояния вашего Redux хранилища,
// что упрощает работу с этим состоянием в TypeScript-коде. Вы можете использовать AppState, например,
// в useSelector из react-redux для типизации возвращаемого значения

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
