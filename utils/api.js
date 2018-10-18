/*
  WOEID, or Where On Earth ID, is a location identifier that allows us find details about a
  specific location. This is from the MetaWeather API
*/

/*
  This API provides:
  1. Location search ( /api/location/search/ ) which allows us to search for a particular city
  2. Location weather information ( /api/location/{woeid} ) which provides a 5 day forecast for a
  certain location
  3. Location day which provides ( /api/location/{woeid}/{date}/ ) forecast history and informa-
  tion for a particular day and location
*/

export const fetchLocationId = async city => { //async functions are built on top of Promises, and they allow us to define asynchronous methods in a synchronous manner
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};