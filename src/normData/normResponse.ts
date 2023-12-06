import { type RespItem, type StateBookInfo } from '../appTypes/appTypes'

const normResponse = (items: RespItem[]): StateBookInfo[] => {
  return items.map((item: RespItem) => item.volumeInfo)
    .map((book: StateBookInfo) => {
      const { categories, description, title, imageLinks, authors } = book

      const currentAuthors = typeof authors === 'undefined' ? ['автор не указан'] : authors
      const currentDescription = typeof description === 'undefined' ? 'у этой книги нет описания' : description
      const currentTitle = typeof title === 'undefined' ? 'у этой книги нет названия' : title
      const сurrentСategories = typeof categories === 'undefined' ? ['нет катогорий'] : categories
      const сurrentImageLinks = typeof imageLinks === 'undefined' ? { smallThumbnail: '', thumbnail: '' } : imageLinks

      // console.log(currentTitle)

      return {
        categories: сurrentСategories,
        description: currentDescription,
        title: currentTitle,
        imageLinks: сurrentImageLinks,
        authors: currentAuthors
      }
    })
}

export default normResponse
