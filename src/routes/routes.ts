const key = process.env.KEY

const apiPath = (seachTitle: string, category: string, sorting: string, startIndex: number): string => {
  const actualSorting = sorting.length === 0 ? 'relevance' : sorting
  const actualCategory = category.length === 0 ? '' : `+subject:${category}`

  return `https://www.googleapis.com/books/v1/volumes?q=intitle:${seachTitle}${actualCategory}
    &orderBy=${actualSorting}&startIndex=${startIndex}&maxResults=32&key=${key}`
}

export default apiPath
