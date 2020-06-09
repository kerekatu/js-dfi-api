import fetch from 'unfetch'
import { DEFAULT_SETTINGS } from './utils'

let timer, sortingDateEnd, sortingDateStart
const dateStartElement = document.querySelector('#select-date-start')
const dateEndElement = document.querySelector('#select-date-end')
const resultElement = document.querySelector('#results')

resultElement.innerHTML = '<h4>Start Typing To See Results...</h4>'

const debounceAPICall = (func, delay) => {
  clearTimeout(timer)

  timer = setTimeout(func, delay)
}

const getFilms = async (title) => {
  if (title.length > 3) {
    resultElement.innerHTML = '<h4>Loading...</h4>'

    const response = await fetch(
      `https://api.dfi.dk/v1/film?title=${title}&ReleaseEnd=${sortingDateEnd}&ReleaseStart=${sortingDateStart}`,
      DEFAULT_SETTINGS
    )
    const data = await response.json()

    const resultList = data.FilmList.map(
      (film) =>
        `<div class="films__result">
        <h2>${film.Title}</h2>
            <p>Released: ${film.ReleaseYear} | Category: ${
          film.Category ?? 'Not Found 😕'
        }</p></div>`
    ).join('')

    resultElement.innerHTML =
      `<h4>Found: ${data.FilmList.length} films</h4>` + resultList
  }
}

dateStartElement.addEventListener(
  'change',
  (e) => (sortingDateStart = e.target.value)
)
dateEndElement.addEventListener(
  'change',
  (e) => (sortingDateEnd = e.target.value)
)

document
  .querySelector('#input-title')
  .addEventListener('input', (e) =>
    debounceAPICall(() => getFilms(e.target.value), 1000)
  )
