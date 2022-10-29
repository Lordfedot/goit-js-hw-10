import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    text: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onInputChange,DEBOUNCE_DELAY))


function onInputChange(e) {
    const name = e.target.value.toLowerCase().trim()
    if (name === '') {
        destroyMarkup()
        return
    }
    fetchCountries(name).then(countries => {
        buildMarkUp(countries) 
    }).catch(() =>{
        destroyMarkup()
    })
}

function buildMarkUp(countries) {
    const bigMarkup = countries.map(country => {
        return createBigMarkUp(country)
    }).join('')
    const lineMarkup = countries.map(country => {
        return createLineMarkUp(country)
    }).join('')
    if (countries.length < 2) {
        refs.info.innerHTML = bigMarkup
        refs.text.innerHTML = ''   
    }else{
        refs.text.innerHTML = lineMarkup
        refs.info.innerHTML = ''
    }
}

function destroyMarkup(){
    refs.text.innerHTML = ''
    refs.info.innerHTML = ''
}

function createLineMarkUp({flags, name}) {
    return `<li class="country-item">
    <img class="country-img" width="30" height="30" src='${flags.png}' alt="${name.official} Flag">
    <p>${name.official}</p>
  </li>`
}

function createBigMarkUp({flags, name, capital,population, languages}) {
    const language = Object.values(languages)
    return `<li class="country-item__coloumn">
    <div class="country-name">
        <img width="80" height="50" src='${flags.png}' alt="${name.official} Flag">
        <p>${name.official}</p>
    </div>
    <ul class="country-meta">
      <li><p><span class="country-meta__title">Capital</span>:${capital}</p></li>
      <li><p><span class="country-meta__title">Population</span>:${population}</p></li>
      <li><p><span class="country-meta__title">Languages</span>:${language}</p></li>
    </ul>
  </li>`
}



