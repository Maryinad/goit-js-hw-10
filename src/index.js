import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CountryAPI, fetchCountries } from './countriesAPI';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchEl: document.querySelector('#search-box'),
  contriesListEl: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchEl.addEventListener(
  'input',
  debounce(onSearchElInput, DEBOUNCE_DELAY)
);

function onSearchElInput(e) {
  const query = e.target.value.trim();
  // console.log(query);
  //   console.log('hello');

  // const result = CountryAPI.searchCountry(query);  ??
  // console.log(result);
  fetchCountries(query)
    .then(data => {
      if (query == '') {
        refs.contriesListEl.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        console.log("Please, enter country's name");
      } else if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.contriesListEl.innerHTML = '';
        refs.countryInfo.innerHTML = '';
      } else if (data.length > 2 && data.length < 10) {
        refs.countryInfo.innerHTML = '';
        renderCountries(data);
      } else {
        refs.contriesListEl.innerHTML = '';
        renderCountry(data);
      }
      console.log(data);
      // renderCountries(data);
    })
    .catch(err => {
      // if (err.message === 404) / ?
      if (err === 404) {
        Notify.failure('Oops, there is no country with that name');
      }

      refs.contriesListEl.innerHTML = '';
      refs.countryInfo.innerHTML = '';
    });
}

function renderCountries(data) {
  const markup = data
    .map(el => {
      return `<li class = "country-item"><img src="${el.flags.png}" alt="" width = 50 class="country-img" ><b>${el.name.common}</b></li>`;
    })
    .join('');

  refs.contriesListEl.innerHTML = markup;
}

function renderCountry(data) {
  const values = Object.values(data[0].languages);
  console.log(values);
  const markup = `<h1 class="country-info-title">
      <img src= "${data[0].flags.png}" alt="" width = 50>
       ${data[0].name.official}</h1>
       <ul class="country-info-list">
    <li class="country-info-item"><b>Capital: </b>${data[0].capital}</li>
    <li class="country-info-item"><b>Population: </b>${data[0].population}</li>
    <li class="country-info-item"><b>Languages: </b>${values.join(', ')}</li>
    </ul>
  `;
  refs.countryInfo.innerHTML = markup;
}
// netherland
