import React from 'react'
import '../styles/app.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearchData } from '../redux/searchSelector'
import type { StateBookInfo } from '../appTypes/appTypes'
import axios from 'axios'
import apiPath from '../routes/routes'
import normResponse from '../normData/normResponse'
import { seachResult } from '../redux/seachAction'

const SearchResults: React.FC = () => {
  const searchData = useSelector(selectSearchData)
  const dispatch = useDispatch()

  const loading = (): void => {
    console.log('Загружаю следующую партию')
    const actuaStartIndex = searchData.searchParams.loadStartIndex + 32

    // const startIndex = actuaStartIndex > searchData.count ? searchData.count - (actuaStartIndex - searchData.count) : actuaStartIndex

    // console.log('Это старт индекс', startIndex)

    axios.get(apiPath(searchData.searchParams.seachTitle, searchData.searchParams.categories,
      searchData.searchParams.sorting, actuaStartIndex))
      .then(response => {
        const { totalItems, items } = response.data

        console.log('Всего книг найдено', totalItems)

        // console.log(items)
        const bookItems = normResponse(items)

        dispatch(seachResult({
          count: totalItems,
          booksInfo: bookItems,
          searchParams: { ...searchData.searchParams, loadStartIndex: actuaStartIndex }
        }))

        console.log(searchData.searchParams)
      })
      .catch((e) => { console.log(e) })
  }

  const searchResultRender = (booksInfo: StateBookInfo[]): React.ReactElement => {
    console.log('привет вам', searchData.booksInfo.length)
    return (
            <div>
                {booksInfo.map((book: StateBookInfo, keyB) => {
                  return (
                        <div key={keyB}>
                            <h3>{book.title}</h3>
                            <h4>{`Это первая категория книи ${book.categories[0]}`}</h4>
                            <h4>{`Это автор ${book.authors[0]}`}</h4>
                            {book.imageLinks.smallThumbnail.length > 0 ? <img src={book.imageLinks.smallThumbnail}/> : null}
                        </div>
                  )
                })}
            </div>
    )
  }

  return (
        <div>
        <h3>{searchData !== null ? `foudn ${searchData.count} books` : 'начните поиск'}</h3>
        {searchData.count > 0 ? searchResultRender(searchData.booksInfo) : null}

        <button onClick={loading}>previos page</button>
        <button onClick={loading}>load more</button>

    </div>
  )
}

export default SearchResults
