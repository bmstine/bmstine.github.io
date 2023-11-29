"use strict"; // Enforces stricter parsing and error handling in your script

$(document).ready(function() {
    // Initialize tabs
    $("#tabs").tabs();

    // Function to fetch weather data
    function fetchWeather(latitude, longitude) {
        var apiKey = '5b690168a187ec4f3b5291c572967625'; // Replace with your API key
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(weatherData) {
                var currentTemp = weatherData.main.temp;
                var tempHigh = weatherData.main.temp_max;
                var tempLow = weatherData.main.temp_min;

                $('#current-temp').text(`Current Temp: ${currentTemp} °C`);
                $('#high-low').text(`High: ${tempHigh} °C / Low: ${tempLow} °C`);
            },
            error: function(error) {
                console.log('Error fetching and parsing data', error);
            }
        });
    }

    // Function to get user's location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            }, function(error) {
                console.log('Error occurred. Error code: ' + error.code);
                // error.code can be:
                //   0: unknown error
                //   1: permission denied
                //   2: position unavailable (error response from location provider)
                //   3: timed out
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    // Get user's location and fetch weather
    getLocation();
});
