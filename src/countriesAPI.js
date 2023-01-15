// export class CountryAPI {
//   static searchCountry(name) {
//     const params = new URLSearchParams({
//       name: query,
//       capital: '',
//       population: '',
//       flags: '',
//       languages: [],
//     });

//     const url = `https://restcountries.com/v3.1/?name/${query}${params}`;
//     return fetch(url, options).then(response => response.json);
//   }
// }

const BASE_URL = 'https://restcountries.com';

export const fetchCountries = query => {
  return fetch(`${BASE_URL}/v3.1/name/${query}?fields=name,capital,population,flags,languages
`).then(res => {
    console.log(res);
    if (!res.ok) {
      throw res.status;
      //   throw new Error(res.status); //?
    }
    return res.json();
  });
};

// fetchCountries('Ukraine').then(data => console.log(data));

// ${BASE_URL}/v3.1/name/${query}
// fetch(`${BASE_URL}/v2/all?fields=${query},capital,population`);
// ?fields=name,capital,population,flags,languages
