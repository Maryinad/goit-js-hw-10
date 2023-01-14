// export class CountryAPI {
//   static searchCountry() {
//     const url = `https://restcountries.com/v3.1/?name/${query}`;
//     // const params = new URLSearchParams({
//     //   name: query,
//     // });
//     fetch(url, options);
//   }
// }

const BASE_URL = 'https://restcountries.com';

export const fetchCountries = query => {
  return fetch(`${BASE_URL}/v3.1/name/${query}`).then(res => {
    console.log(res);
    if (!res.ok) {
      throw res.status;
    }
    return res.json();
  });
};

fetchCountries('Ukraine').then(data => console.log(data));

// ${BASE_URL}/v3.1/name/${query}
// fetch(`${BASE_URL}/v2/all?fields=${query},capital,population`);
