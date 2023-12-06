import React from 'react'
import '../styles/app.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearchData } from '../redux/searchSelector'
import type { StateBookInfo } from '../appTypes/appTypes'
import axios from 'axios'
import apiPath from '../routes/routes'
import normResponse from '../normData/normResponse'
import { seachResult } from '../redux/seachAction'
import img from '../static/content.png'

const SearchResults: React.FC = () => {
  const searchData = useSelector(selectSearchData)
  const dispatch = useDispatch()

  const loading = (): void => {
    // console.log('Загружаю следующую партию')
    const actuaStartIndex = searchData.searchParams.loadStartIndex + 32

    // const startIndex = actuaStartIndex > searchData.count ? searchData.count - (actuaStartIndex - searchData.count) : actuaStartIndex

    // console.log('Это старт индекс', startIndex)

    axios.get(apiPath(searchData.searchParams.seachTitle, searchData.searchParams.categories,
      searchData.searchParams.sorting, actuaStartIndex))
      .then(response => {
        const { totalItems, items } = response.data
        // console.log('Всего книг найдено', totalItems)
        // console.log(items)
        const bookItems = normResponse(items)

        dispatch(seachResult({
          count: totalItems,
          mainMessage: '',
          booksInfo: bookItems,
          searchParams: { ...searchData.searchParams, loadStartIndex: actuaStartIndex }
        }))

        // console.log(searchData.searchParams)
      })
      .catch((e) => { console.log(e) })
  }

  const searchResultRender = (booksInfo: StateBookInfo[]): React.ReactElement => {
    // console.log('привет вам', searchData.booksInfo.length)
    return (
            <div className='books-container'>
                {booksInfo.map((book: StateBookInfo, keyB) => {
                  return (
                        <div key={keyB} className='each-book'>

                          <div className='img-book'>
                          {book.imageLinks.smallThumbnail.length > 0
                            ? <img src={book.imageLinks.smallThumbnail} className='img-shadow' />
                            : <img src={img} className='img-shadow' />}
                          </div>

                          <div className='description-book'>
                          <span className='book-categiry'>{book.categories[0]}</span>
                          <span className='book-title'>{book.title}</span>
                          <span className='book-authors'>{book.authors}</span>
                          </div>
                        </div>
                  )
                })}

                <div className='footer'>
                  <button onClick={loading}>previos page</button>
                  <button onClick={loading}>load more</button>
                  </div>
                </div>
    )
  }

  return (
    <div className="main-content">
      <div className='seach-result'>
      <span>{searchData.count !== 0 ? `foudn ${searchData.count} books` : searchData.mainMessage}</span>
      </div>

      {searchData.count > 0 ? searchResultRender(searchData.booksInfo) : null}

    </div>
  )
}

export default SearchResults
