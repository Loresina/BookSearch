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
      // здесь должен происходить запрос на API с нужныит данными
      axios.get(apiPath(values.seachTitle, values.categories, values.sorting, 0))
        .then(response => {
          const { totalItems, items } = response.data

          console.log(response)
          console.log(items)
          if (totalItems > 0) {
            const bookItems = normResponse(items)
            dispatch(seachResult({ count: totalItems, booksInfo: bookItems, searchParams: { ...values, loadStartIndex: 0 } }))
          }
        })
        .catch(error => {
          console.error('Ято-то пошло не так', error)
        })
    }
  })

  return (
    <div>
      <div>
      <h1 className="header">Search for books</h1>
      </div>

      <div>
      <form onSubmit={formik.handleSubmit}>

      <div>
      <label htmlFor="seachTitle"
      style={{ position: 'absolute', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>Enter the title</label>
      <input
      id="seachTitle"
      name="seachTitle"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.seachTitle}
      ref={inputFocus}/>
      </div>

    <label htmlFor="categories">Categories</label>
    <input
      id="categories"
      name="categories"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.categories}
    />
    <label htmlFor="sorting">Sorting by</label>
    <input
      id="sorting"
      name="sorting"
      type="sorting"
      onChange={formik.handleChange}
      value={formik.values.sorting}
    />
    <button type="submit">Submit</button>
    <div>
</div>
  </form>
      </div>
    </div>
  )
}

export default SearchHeader
