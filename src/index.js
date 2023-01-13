import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './countriesAPI';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchEl: document.querySelector('#search-box'),
  contriesListEl: document.querySelector('.country-list'),
};

refs.searchEl.addEventListener('input', debounce(onSearchElInput, 300));

function onSearchElInput(e) {
  const query = e.target.value.trim();
  console.log(query);
  //   console.log('hello');

  fetchCountries(query)
    .then(data => {
      console.log(data);
      renderCountry(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function renderCountry(data) {
  const markup = `<h2 class="country-card-name">${data.name}</h2>
    <li class="country-card-item"><b>Capital:</b>${data.capital}</li>
    <li class="country-card-item"><b>Population:</b>${data.population}</li>
    <li class="country-card-item"><b>Languages:</b>${data.languages}</li>
  `;
  refs.contriesListEl.innerHTML = markup;
}
