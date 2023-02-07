//'querySelector' for search button on search form
var searchButton = $('#search-button');

//API key for the 'OpenWeather' API
var APIKey = "dcc6a03b53c3d32a95c06e7eb29d3c55";

//A variable to hold the present time from 'Moment.js'
var time = moment();

//'querySelector' for the sectionelement that displays the weather 
//for the present date
var today = $("#today");

//'querySelector' for the sectionelement that displays the 5-day
//weather forecast 
var forecast = $("#forecast");

//'querySelector' for the section element that holds a header for the 
//5-day forecast
var forecastHeader = $("#forecast-header");

//Array used to store and to handle the names of cities from previous weather searches
var cityArray = [];


//Function to create buttons for cities from previous searches
function buttons() {
  
  //Recalls cities from previous searches from 'localStorage'
  var cityArrayStored = JSON.parse(localStorage.getItem("pastCities3"));
  
  //Removes previous copies of buttons to prevent duplication when new buttons are printed
  $("#history").empty();
  
  //'cityArray' will equal the stored version of 'cityArray' if one is retained in 'localStorage'
  if (cityArrayStored !== null) {
    cityArray = cityArrayStored;
  }

  //'for' loop to generate buttons for the city names retained in 'localStorage' and held in 
  //the 'cityArray' variable; this includes CSS formatting
  for (var i = 0; i < cityArray.length; i++) {
    var buttonMaker = $("<button>");
    buttonMaker.text(cityArray[i]);
    buttonMaker.attr("city-name", cityArray[i]);
    buttonMaker.addClass("city-button");
    buttonMaker.css({"background-color": "rgb(215, 208, 208)", "border": "none", "margin-top": "5px", "margin-bottom": "5px", 
    "height": "30px", "width": "295px", "border-radius": "5px"})
    
    //Buttons are prepended to the '#history' element so that the most recent searches appear first
    $("#history").prepend(buttonMaker);
  }
}

buttons();

//Function to display present weather and 5-day forecast. This function is called either when a 
//new city search is iniated or when a button is clicked for a previous city search name.
function weatherDisplay() {
    
  //As the name for the city search is initially held in variables inside other functions 
  //it needs to be stored in 'localStorage' to be made available for this function (owing to problems 
  //of local scope)
  var city = localStorage.getItem("citySearch")
  
  //Constructs the URL to acquire the latitude and longitude for the city of interest. This is
  //required, rather than a city name, to obtain a 5-day forecast. 
  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
  
  //This condition prevents the code running any further should the search button have been clicked without
  //text having been entered.
  if (city === "") {
        return;
  } else {
    
      //Empties the elements, where the weather will be displayed, of any previous forecasts in order to 
      //prevent clutter and to make room for newly retrieved information.
      today.empty();
      forecastHeader.empty();
      $("#forecast").empty();
    
      //The ajax() method is used to request latitude and longitude information for the city spcecified in 
      //'queryURL'.
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          
        //Latitude and longitude variables used to construct a second URL to obtain a 5-day forecast.
        var latitude = response[0].lat;
        var longitude = response[0].lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
      
        //ajax() method used to request 5-day weather forecast.
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
          //Present date for the current day weather display
          var datePresent = time.format("D/M/YYYY");

          //Current day temperature converted from Kelvsin to Celsius
          var celsiusPresent = (response.list[0].main.temp - 273.15).toFixed(2);

          //Variable for 'Open Weather's icon depicting the weather; copies of all of 'Open Weather's
          //icons are stored as .png files in the images folder.
          var iconNumberPresent = response.list[0].weather[0].icon;

          //Variables for elements to display weather data.
          var cityName = $("<h1>");
          var tempPresent = $("<p>");
          var windPresent = $("<p>");
          var humidPresent = $("<p>");
          var iconPresent = $("<img>");
        
          //An element to hold header text for the 5-day weather display
          var fiveDayHeader = $("<h3>");

          //Content of elements set using data from 'Open Weather' and 'Moment.js' or from variables
          //representing this data.
          cityName.text(city + " (" + datePresent + ") ");
          tempPresent.text("temp: " + celsiusPresent + " °C");
          windPresent.text("wind: " + response.list[0].wind.speed + " km/h");
          humidPresent.text("humidity: " + response.list[0].main.humidity + "%");
          iconPresent.attr("src", "images/"+ iconNumberPresent + ".png");

          //Formatting of the elements in the weather display
          cityName.css({"color": "black", "margin-bottom": "5px"});
          iconPresent.css("width", "50px");
          tempPresent.css({"color": "black", "margin-top": "5px"});
          windPresent.css("color", "black");
          humidPresent.css("color", "black");

          //Elements to display the weather appended to the "#today" element
          today.append(cityName);
          today.append(iconPresent);
          today.append(tempPresent);
          today.append(windPresent);
          today.append(humidPresent);
        
          //Formatting of the "#today" element, represented by the 'today' variable
          today.css({"padding-left": "20px", "width": "100%", "border": "solid black 1px", "background-color": "rgb(134, 194, 246)"});
        
          //Text set for the 5-Day Forecast element and appended to the "#forecast-header" element.
          fiveDayHeader.text("5-Day Forecast:")
          forecastHeader.append(fiveDayHeader);

          //A 'for' loop to build the 5-day forecast display. The variable 'i' begins at 1
          //as this loop is used to search weather 'i' days after the present date.
          for (var i = 1; i < 6; i++) {
          
            //This variable is used to search for weather forecasts by date within the object received
            //from "Open Weather".
            var futureDate = moment().add(i, "days").format("YYYY-MM-DD");
          
            //This variable displays the date for each of the days in the 5-day forecast
            var futureDateDisplay = moment().add(i, "days").format("D/M/YYYY");
          
            //A variable and function to 'find' forecasts within the "Open Weather" object
            //by date. There are forecasts for every three hours five days into the future.
            //Accordingly, midday for each day was chosen as a representative forecast for 
            //the entire day.
            var futureWeather = response.list.find(function(j) {
              return j.dt_txt === futureDate + " 12:00:00";
            });

            //Elements to build the 5-day weather display. An <article> element is used to hold
            //the weather forecast for each day.
            var article = $("<article>");
            var futureDate = $("<h3>");
            var futureIcon = $("<img>");
            var tempFuture = $("<p>");
            var windFuture = $("<p>");
            var humidFuture = $("<p>");

            //A variable holding a temperature value for each day converted from Kelvin to Celsius
            var celsiusFuture = (futureWeather.main.temp - 273.15).toFixed(2);
          
            //Variable for 'Open Weather's icon depicting the weather; copies of all of 'Open Weather's
            //icons are stored as .png files in the images folder.
            var iconNumber = futureWeather.weather[0].icon;

            //The content for each of the 5-day weather display elements.
            futureDate.text(futureDateDisplay);
            tempFuture.text("Temp: " + celsiusFuture + " °C");
            windFuture.text("Wind: " + futureWeather.wind.speed + " km/h");
            humidFuture.text("Humidity: " + futureWeather.main.humidity + "%");
          
            //Variable for 'Open Weather's icon depicting the weather; copies of all of 'Open Weather's
            //icons are stored as .png files in the images folder.
            futureIcon.attr("src", "images/"+ iconNumber + ".png");

            //Formatting for the 5-day weather display elements.
            futureDate.css("margin", "5px");
            futureIcon.css("width", "50px");
            tempFuture.css("margin-top", "5px");

            //Each weather display element is appended to an <article> element and the five <article>
            //elements for each day of the forecast are appended to the "#forecast" element.
            forecast.append(article);
            article.append(futureDate);
            article.append(futureIcon);
            article.append(tempFuture);
            article.append(windFuture);
            article.append(humidFuture);
          
            //Formatting for the <article> elements (one for each day of the 5-day forecast).
            article.css({"padding-left": "10px", "background-color": "rgb(12, 93, 180)", "margin-right": "30px", "color": "white", 
            "width": "150px", "border": "solid black 1px"})
          };
           
        })
      })
  }
}




$(document).on("click", ".city-button", oldSearchCity);

function oldSearchCity() {
  var cityButton = $(this).attr("city-name");
  localStorage.setItem("citySearch", cityButton);
  weatherDisplay();
}

(searchButton).on("click", function(event) {
  var citySearch = $("#search-input").val();
  event.preventDefault();
  localStorage.setItem("citySearch", citySearch);
  $("#search-input").val("");
  if (citySearch !=="") {
    cityArray.push(citySearch);
    localStorage.setItem("pastCities3", JSON.stringify(cityArray));
    buttons();
  } else {
    return;
  }
  weatherDisplay();
})