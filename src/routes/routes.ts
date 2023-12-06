const key = process.env.KEY

console.log('Я ключ', process.env.KEY)

// const apiPath = (seachTitle: string, category: string, sorting: string ) => {
//     return `https://www.googleapis.com/books/v1/volumes?q=intitle:${seachTitle}+subject:${category}
//     &orderBy=relevance&startIndex=0&maxResults=30&key=${key}`
//   };
const apiPath = (seachTitle: string, category: string, sorting: string, startIndex: number): string => {
  const actualSorting = sorting.length === 0 ? 'relevance' : sorting
  const actualCategory = category.length === 0 ? '' : `+subject:${category}`

  return `https://www.googleapis.com/books/v1/volumes?q=intitle:${seachTitle}${actualCategory}
    &orderBy=${actualSorting}&startIndex=${startIndex}&maxResults=32&key=${key}`
}

export default apiPath

// `https://www.googleapis.com/books/v1/volumes?q=intitle:москва+subject:all&orderBy=relevance&startIndex=0&maxResults=32&key=AIzaSyD4XJDvPWPWBs4dgUDQUe5sYASHCRvYGD4`
