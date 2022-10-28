import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    text: document.querySelector('.country-list')
}

refs.input.addEventListener('input', debounce(buildMarkup,DEBOUNCE_DELAY))


function buildMarkup(e) {
    if (e.target.value === '') {
        destroyMarkup()
        return
    }
    const name = e.target.value.toLowerCase().trim()
    fetchCountries(name).then(countries => {
        if (countries.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            return 
        }
        const fullLineMarkUp = countries.map(country =>{
            if (countries.length < 2) {
                return createBigMarkUp(country)
            }
            return createLineMarkUp(country)
        }).join('')
        refs.text.innerHTML = fullLineMarkUp;
    })
    .catch(error => {
        destroyMarkup
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }) 
}

function destroyMarkup(){
    refs.text.innerHTML = ''
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



