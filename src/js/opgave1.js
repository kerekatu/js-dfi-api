import fetch from 'unfetch'
import { DEFAULT_SETTINGS } from './utils'

const URL = 'https://api.dfi.dk/v1/film/74245'

fetch(URL, DEFAULT_SETTINGS)
  .then((response) => response.json())
  .then((result) => console.log(result))

export { DEFAULT_SETTINGS }
