declare module 'react-select-country-list' {
  type CountryOption = {
    label: string;
    value: string;
  };

  function countryList(): {
    getData: () => CountryOption[];
  };

  export default countryList;
}
