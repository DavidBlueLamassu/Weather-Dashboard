var searchButton = $('#search-button');
var APIKey = "dcc6a03b53c3d32a95c06e7eb29d3c55";
var time = moment();
var today = $("#today");
var forecast = $("#forecast");
var forecastHeader = $("#forecast-header");
var cityArray = [];

console.log(moment([2007, 0, 29]).fromNow());
console.log(moment().add(1, "days").format("D, M, YYYY"));

//var timeAbreviated = time.format 

// var latitude;
// var longitude;

(searchButton).on("click", function(event) {
    var city = $("#search-input").val();
    event.preventDefault();
    today.empty();
    forecastHeader.empty();
    $("#forecast").empty();
    if (city === "") {
        return;
    } else {console.log(city);
        console.log(city);
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response[0].name);
        console.log(response[0].name);
        console.log(response[0].lat);
        console.log(response[0].lon);
        var latitude = response[0].lat;
        var longitude = response[0].lon;
        console.log(latitude);
        console.log(longitude);
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(response.city.name);
        console.log(time.format("D/M/YYYY"));
        var datePresent = time.format("D/M/YYYY");
        var celsiusPresent = (response.list[0].main.temp - 273.15).toFixed(2);
        console.log(celsiusPresent + " C");
        console.log(response.list[0].main.humidity + "%");
        console.log(response.list[0].wind.speed + " km/h");
        console.log(response.list[0].weather[0].icon);
        var iconNumberPresent = response.list[0].weather[0].icon;
        var cityName = $("<h1>");
        cityName.text(city + " (" + datePresent + ") ");
        today.append(cityName);
        var tempPresent = $("<p>");
        var windPresent = $("<p>");
        var humidPresent = $("<p>");
        var iconPresent = $("<img>");
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
        //console.log(response.list.find("2023-02-04 18:00:00"))
        // console.log(accounts.find(function(i) {
        //   return i.balance === 250000;

        var fiveDayHeader = $("<h3>");
        fiveDayHeader.text("5-Day Forecast:")
        forecastHeader.append(fiveDayHeader);

        for (var i = 1; i < 6; i++) {
          var futureDate = moment().add(i, "days").format("YYYY-MM-DD");
          var futureDateDisplay = moment().add(i, "days").format("D/M/YYYY");
          console.log(response.list.find(function(j) {
            return j.dt_txt === futureDate + " 12:00:00";
            }))
            var futureWeather = response.list.find(function(j) {
              return j.dt_txt === futureDate + " 12:00:00";
              });
            console.log(futureWeather);
            console.log(futureWeather.main.temp);
            console.log(futureWeather.wind.speed);
            console.log(futureWeather.main.humidity);
            console.log(futureWeather.weather[0].icon);
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
            

            // $("#forecast").children[i - 1].append(tempfuture);
            // $("#forecast").children[i - 1].append(windFuture);
            // $("#forecast").children[i - 1].append(humidFuture);
        };

        // var futureDate = moment().add(i, "days").format("YYYY-MM-DD");
        // console.log(moment().add(1, "days").format("D, M, YYYY"));
        // console.log(response.list.find(function(j) {
        //   return j.dt_txt === futureDate + " 12:00:00";
        //   }))
      }
      )
      }
      )
   }
})

// function weather() {
//     var queryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//         console.log(response);
//       }
//       )
// }

//localStorage??

// function coordinates() {
//     console.log(city);
//     var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=dcc6a03b53c3d32a95c06e7eb29d3c55";
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//         console.log(response.name);
//         console.log(response.lat);
//         console.log(response.lon);
//       }
//       )
// }

//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=dcc6a03b53c3d32a95c06e7eb29d3c55