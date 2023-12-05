import React from 'react'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import SearchHeader from './SearchHeader'
import SelectedBook from './SelectedBook'
import SearchResuits from './SearchResults'
import { Provider } from 'react-redux'
import store from '../redux/store'

// здесь подключить i18next
// второй компонент - для отрисовки списка книг
// как сделать так, чтобы по клику на книгу открывалась другая страница... возможно, роуты

const App: React.FC = () => {
  return (
        <div>
          <BrowserRouter>
            <Provider store={store}>
              <SearchHeader />
              <Routes>
                <Route path="/search" element={<SearchResuits />} />
                <Route path="/book" element={<SelectedBook />} />
                <Route path="*" element={<SearchResuits />} />
              </Routes>
              {/* <SearchResuits /> */}
            </Provider>
          </BrowserRouter>
        </div>
  )
}

export default App
