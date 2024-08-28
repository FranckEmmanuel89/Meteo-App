document.addEventListener("DOMContentLoaded", function () {

  const today = new Date();
  const options = { weekday: "short", day: "2-digit", month: "short" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  document.getElementById("currentDate").innerHTML = `<span>${formattedDate}</span>`;
});

const APIKEY = "16d5384ad1a1e13c8c9ff70890e9a1e9";
const InputCity = document.querySelector("#input-city");
const searchButton = document.querySelector(".search-button");
const icon = document.querySelector(".icon");

let apiCall = function (city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

  fetch(url)
    .then((Response) =>
      Response.json().then((data) => {
        console.log(data);
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
        document.querySelector("#wind").innerHTML = data.wind.speed + " M/s";
        document.querySelector("#state").innerHTML = data.weather[0].main;

        if (data.weather[0].main == 'Clouds') {
          icon.src = 'Images/clouds.png'
        } else if (data.weather[0].main == 'Clear') {
          icon.src = 'Images/clear.png' 
        } else if (data.weather[0].main == 'Rain') {
          icon.src = 'Images/rain.png' 
        } else if (data.weather[0].main == 'Drizzle') {
          icon.src = 'Images/drizzle.png' 
        } else if (data.weather[0].main == 'Mist') {
          icon.src = 'Images/mist.png' 
        }
     
     
      })
    )
    .catch((err) => console.log("Erreur : " + err));
};

searchButton.addEventListener("click", () => {
  if (InputCity.value.trim() !== "") {
    let ville = InputCity.value;
    InputCity.value = "";
    apiCall(ville);
  }
});

InputCity.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && InputCity.value.trim() !== "") {
    let ville = InputCity.value;
    InputCity.value = "";
    apiCall(ville);
  }
});


