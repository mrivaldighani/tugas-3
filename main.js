const url = "https://covid-193.p.rapidapi.com/statistics";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f3d679c6e1mshc4160651454ffadp19521djsn86aab2033831",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

// list country option
const countryList = document.getElementById("countryList");

function populateCountryList() {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const countries = data.response;
      // Clear the list
      countryList.innerHTML = "";
      countries.forEach((countryData) => {
        // console.log(countryData.country);
        const countryOption = document.createElement("option");
        countryOption.setAttribute("value", countryData.country);
        countryOption.textContent = countryData.country;
        countryList.append(countryOption);
      });
    });
}

// get data from countryList
populateCountryList();

// submit input to html
const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  countryOutput.classList.add("show");

  const currentCountry = countryForm.value;

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      parseData(data.response, currentCountry);
    });
});

// condition
function parseData(stat, currentCountry) {
  const filteredData = stat.filter((countries) => {
    return countries.country === currentCountry;
  });
  // if data not founnd
  if (filteredData.length === 0) {
    countryOutput.innerHTML = "Data tidak ditemukan";
    populationOutput.innerHTML = "error";
    testOutput.innerHTML = "error";
    deathOutput.innerHTML = "error";
    activeOutput.innerHTML = "error";
    recoveredOutput.innerHTML = "error";
    totalOutput.innerHTML = "error";
  }
  // if data found
  else {
    filteredData.forEach((countryData) => {
      countryOutput.innerHTML = currentCountry;
      populationOutput.innerHTML = countryData.population;
      testOutput.innerHTML = countryData.tests.total;
      deathOutput.innerHTML = countryData.deaths.total;
      activeOutput.innerHTML = countryData.cases.active;
      recoveredOutput.innerHTML = countryData.cases.recovered;
      totalOutput.innerHTML = countryData.cases.total;
    });
  }
}
