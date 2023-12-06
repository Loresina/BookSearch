import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import '../styles/app.scss'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { seachResult } from '../redux/seachAction'

import apiPath from '../routes/routes'
// import { type RespItem, type StateBookInfo } from '../appTypes/appTypes'
import normResponse from '../normData/normResponse'

const SearchHeader: React.FC = () => {
  const inputFocus = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  // const [messageNotFound, setFound] = useState('')

  const allCategories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
  const allSorting = ['relevance', 'newest']

  useEffect(() => {
    if (inputFocus.current !== null) {
      inputFocus.current.focus()
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      seachTitle: '',
      categories: '',
      sorting: ''
    },
    // validationSchema: yup.object({
    //   username: yup.string()
    //     .required(t('required')),
    //   password: yup.string()
    //     .required(t('required')),
    // }),
    onSubmit: (values) => {
      axios.get(apiPath(values.seachTitle, values.categories, values.sorting, 0))
        .then(response => {
          const { totalItems, items } = response.data

          if (totalItems > 0) {
            const bookItems = normResponse(items)
            dispatch(seachResult({ count: totalItems, mainMessage: '', booksInfo: bookItems, searchParams: { ...values, loadStartIndex: 0 } }))
          } else {
            console.log('я тут')
            dispatch(seachResult({ count: totalItems, mainMessage: 'по вашему запросу ничего не найдено', booksInfo: [], searchParams: { ...values, loadStartIndex: 0 } }))
          }
        })
        .catch(error => {
          console.error('Что-то пошло не так', error)
        })
    }
  })

  return (
    <div className='main-content'>
      <div className='search-header'>
        <div className='seach-title'>
          <h1>Search for books</h1>
          <div className='form'>
            <form onSubmit={formik.handleSubmit}>
              <div className='main-form'>
              <button type="submit" className='submit-button'>
              <svg className="navigation-icon" width="20" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m19.026 17.05-3.71-3.7c1.002-1.3 1.704-3 1.704-4.9 0-4.4-3.61-8-8.023-8C4.585.45.975 4.15.975 8.55c0 4.4 3.61 8 8.022 8 1.805 0 3.51-.6 4.914-1.7l3.71 3.7 1.405-1.5Zm-10.029-2.5c-3.309 0-6.017-2.7-6.017-6s2.708-6 6.017-6c3.31 0 6.017 2.7 6.017 6s-2.707 6-6.017 6Z" fill="#000"/>
              </svg>
              </button>
              <label htmlFor="seachTitle">начните поиск книг</label>
                <input
                id="seachTitle"
                name="seachTitle"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.seachTitle}
                ref={inputFocus}
                placeholder="Введите название книги"/>
              </div>

                <div className='filters-inputs'>
                  <div className='filters-item'>
                  <label htmlFor="categories">Categories</label>
                  <select
                  className='sub-input'
                  id="categories"
                  name="categories"
                  onChange={formik.handleChange}
                  value={formik.values.categories}
                  >
                    {allCategories.map((category: string, key) => <option key={key} value={category}>{category}</option>)}
                  </select>
                  </div>

                  <div className='filters-item'>
                  <label htmlFor="sorting">Sorting by</label>
                  <select
                  className='sub-input'
                  id="sorting"
                  name="sorting"
                  onChange={formik.handleChange}
                  value={formik.values.sorting}
                  placeholder="тип отображения"
                  >
                    {allSorting.map((sorting: string, key) => <option key={key} value={sorting}>{sorting}</option>)}
                  </select>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
