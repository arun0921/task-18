///container div
const container = document.createElement("div");
container.className = "container";
container.id = "wrapper";
document.body.appendChild(container);

//row div
const row = document.createElement("div");
row.className = "row";
row.id = "r1";
container.appendChild(row);

// Rest Countries List
const restweather = () => {
  // div to display Loading window
  let loader = `<div class="boxLoading">Loading...</div>`;
  document.getElementById("r1").innerHTML = loader;
  // fetching from rest-countries API
  fetch("https://restcountries.com/v2/all")
    //parsing the response to JSON
    .then((response) => response.json())
    .then(function (data) {
      let result = `<h2 style="color:white; text-align:center;"> Countries and their Weather</h2>`; //  Page Heading
      data.forEach((info, id) => {
        const { name, flag, capital, region, alpha3Code, latlng } = info;
        result +=
          // Creating remaining repeating HTML elements
          `<div class="col-lg-4">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h3> ${name} </h3>
                                    </div>
                                    <div class="card-body">
                                    <img  class="rounded mx-auto d-block card-img" src=${flag}  id="flag" alt="Countries-Flag">
                                        <h4> Capital:  ${capital} </h4>
                                        <h4> Region :  ${region} </h4>
                                        <h4> Country-Code: ${alpha3Code} </h4>
                                        <h4> LatLng: ${latlng} </h4>
                                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${id}" aria-expanded="false" aria-controls="collapseExample" onclick="weatherData()">
                                               Click for Weather
                                        </button>
                                        <div class="collapse" id="collapseExample${id}">
                                        This is the text where weather data is to be displayed.
                                        <div class="info">
                                           </div>
                                           </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        ///Calling the openweather API to display weather
        const weatherData = async () => {
          const response1 = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e533d87050856a34b6e9d2fa2d561f49`
          );
          const res = await response1.json();
          // console.log(res);
          localStorage["jsonData"] = JSON.stringify(res);
          const getClass = document.querySelector(`#collapseExample${id}`);
          getClass.innerText = `
                        In ${name}
                        Weather is   ${res.weather[0].description}, 
                        Temperature is ${res.main.temp}°F,
                        Feels Like  ${res.main.feels_like}°F,
                    Max Temperature is ${res.main.temp_max}°F,
                    Min Temperature is ${res.main.temp_min}°F,
                        Humidity:     ${res.main.humidity},
                        Visibility :  ${res.visibility}
                        `;
        };
        weatherData(); //calling the weather function
        document.getElementById("r1").innerHTML = result; /// appending results to the row div
      });
    });
};

restweather();