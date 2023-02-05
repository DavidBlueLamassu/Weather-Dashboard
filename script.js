var searchButton = $('#search-button');
var APIKey = "dcc6a03b53c3d32a95c06e7eb29d3c55";
var time = moment();
var today = $("#today");
var forecast = $("#forecast");
var forecastHeader = $("#forecast-header");
var cityArray = [];

buttons();

function weatherDisplay() {
    var city = localStorage.getItem("citySearch")
    // event.preventDefault();
    
    if (city === "") {
        return;
    } else {
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
    today.empty();
    forecastHeader.empty();
    $("#forecast").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var latitude = response[0].lat;
        var longitude = response[0].lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var datePresent = time.format("D/M/YYYY");
        var celsiusPresent = (response.list[0].main.temp - 273.15).toFixed(2);
        var iconNumberPresent = response.list[0].weather[0].icon;
        var cityName = $("<h1>");
        var tempPresent = $("<p>");
        var windPresent = $("<p>");
        var humidPresent = $("<p>");
        var iconPresent = $("<img>");
        var fiveDayHeader = $("<h3>");
        cityName.text(city + " (" + datePresent + ") ");
        today.append(cityName);
        iconPresent.attr("src", "images/"+ iconNumberPresent + ".png");
        tempPresent.text("temp: " + celsiusPresent + " °C");
        windPresent.text("wind: " + response.list[0].wind.speed + " km/h");
        humidPresent.text("humidity: " + response.list[0].main.humidity + "%");
        iconPresent.attr("src", "images/"+ iconNumberPresent + ".png");
        today.append(iconPresent);
        today.append(tempPresent);
        today.append(windPresent);
        today.append(humidPresent);
        today.css({"padding": "20px", "width": "100%", "border": "solid black 1px", "background-color": "rgb(134, 194, 246)"});
        fiveDayHeader.text("5-Day Forecast:")
        forecastHeader.append(fiveDayHeader);

        for (var i = 1; i < 6; i++) {
          var futureDate = moment().add(i, "days").format("YYYY-MM-DD");
          var futureDateDisplay = moment().add(i, "days").format("D/M/YYYY");
          var futureWeather = response.list.find(function(j) {
              return j.dt_txt === futureDate + " 12:00:00";
              });
          var article = $("<article>");
          var futureDate = $("<h3>");
          var futureIcon = $("<img>");
          var tempFuture = $("<p>");
          var windFuture = $("<p>");
          var humidFuture = $("<p>");
          var celsiusFuture = (futureWeather.main.temp - 273.15).toFixed(2);
          var iconNumber = futureWeather.weather[0].icon;
          futureDate.text(futureDateDisplay);
          futureIcon.attr("src", "images/"+ iconNumber + ".png");
          tempFuture.text("Temp: " + celsiusFuture + " °C");
          windFuture.text("Wind: " + futureWeather.wind.speed + " km/h");
          humidFuture.text("Humidity: " + futureWeather.main.humidity + "%");
          forecast.append(article);
          article.append(futureDate);
          article.append(futureIcon);
          article.append(tempFuture);
          article.append(windFuture);
          article.append(humidFuture);
          article.css({"padding": "10px", "background-color": "rgb(3, 57, 84)", "margin-right": "20px", "color": "white", "width": "120px"})
            };
           
      }
      )
      }
      )
    }
}


function buttons() {
  var cityArrayStored = JSON.parse(localStorage.getItem("pastCities3"));
  $("#history").empty();
  console.log(cityArrayStored);
  if (cityArrayStored !== null) {
    cityArray = cityArrayStored;
  }
  console.log(cityArray);
  for (var i = 0; i < cityArray.length; i++) {
    var buttonMaker = $("<button>");
    buttonMaker.text(cityArray[i]);
    buttonMaker.attr("city-name", cityArray[i]);
    buttonMaker.addClass("city-button");
    $("#history").append(buttonMaker);
  }
}

$(document).on("click", ".city-button", cityNameTest);

function cityNameTest() {
  console.log("ouch!");
  var cityButton = $(this).attr("city-name");
  console.log(cityButton);
  localStorage.setItem("citySearch", cityButton);
  weatherDisplay();
}

(searchButton).on("click", function(event) {
  var citySearch = $("#search-input").val();
  event.preventDefault();
  localStorage.setItem("citySearch", citySearch);
  weatherDisplay();
  console.log(citySearch);
  console.log(cityArray);
  if (citySearch !=="") {
    cityArray.push(citySearch);
    console.log(cityArray);
    localStorage.setItem("pastCities3", JSON.stringify(cityArray));
    buttons();
  } else {
    return;
  }
    
})