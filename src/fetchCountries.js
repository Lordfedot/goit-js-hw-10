import Notiflix from 'notiflix';

export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`)
    .then(r => {
        if (!r.ok) {
            throw new Error(r.status);
          }
        return r.json()
    })
    .then(countries => {
        if (countries.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            return 
        }
        return countries
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    }) 
}