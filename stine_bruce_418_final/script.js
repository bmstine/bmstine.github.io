"use strict";

$(document).ready(function() {
    // Set up the image slider
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2500
    });

    // Set up the tabs
    $("#tabs").tabs();

    // Gets weather data
    function fetchWeather(latitude, longitude) {
        var apiKey = '5b690168a187ec4f3b5291c572967625'; // Replace with your API key
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
        
        // Show message while loading weather
        $('#weather-info').text('Weather for your area is loading...');
        
        // Request and display weather
        fetch(url)
        .then(response => response.json())
        .then(weatherData => {
            var currentTemp = weatherData.main.temp;
            var tempHigh = weatherData.main.temp_max;
            var tempLow = weatherData.main.temp_min;

            // Update the webpage with weather info
            $('#weather-info').html(
                `<div id="current-temp">Current Temp: ${currentTemp} °F</div>` +
                `<div id="high-low">High: ${tempHigh} °F / Low: ${tempLow} °F</div>`
            );

            // Save weather info for later
            localStorage.setItem('weatherData', JSON.stringify({latitude, longitude, currentTemp, tempHigh, tempLow}));
        })
        .catch(error => {
            // Show error if weather can't be loaded
            $('#weather-info').text('Unable to load weather data.');
            console.error('Error fetching weather data:', error);
        });
    }

    // Get user location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => fetchWeather(position.coords.latitude, position.coords.longitude),
                error => {
                    // Show error if location can't be accessed
                    $('#weather-info').text('Weather data cannot be fetched without location access.');
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            // Tell user if their browser doesn't support location
            $('#weather-info').text('Geolocation is not supported by your browser.');
        }
    }

    // Check for saved weather info or get new data
    var cachedWeatherData = localStorage.getItem('weatherData');
    if (cachedWeatherData) {
        var {latitude, longitude} = JSON.parse(cachedWeatherData);
        fetchWeather(latitude, longitude);
    } else {
        getLocation();
    }

    // When clicking on video thumbnails
    $('.video-thumbnails img').on('click', function() {
        var videoId = $(this).data('video-id');
        var iframeSrc = 'https://www.youtube.com/embed/' + videoId;
        // Change the main video to the one clicked
        $('.featured-video iframe').attr('src', iframeSrc);
    });
});