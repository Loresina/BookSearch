import React from 'react'
import SearchHeader from './SearchHeader'
import SearchResuits from './SearchResults'
import { Provider } from 'react-redux'
import store from '../redux/store'

// здесь подключить i18next
// второй компонент - для отрисовки списка книг
// как сделать так, чтобы по клику на книгу открывалась другая страница... возможно, роуты

const App: React.FC = () => {
  return (
        <div>
            <Provider store={store}>
             <SearchHeader />
             <SearchResuits />
            </Provider>
        </div>
  )
}

export default App
