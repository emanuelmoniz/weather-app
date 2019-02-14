// TODO: Write your JS code in here
import $ from 'jquery';
import { initSelect2 } from './plugins/init_select2';
import { getWeather, getWeatherByCoords } from './weather';
import { cities } from './cities';

const submit = document.getElementById("submit-coords");

// initialize plugins
initSelect2();


$('#city-input').select2({ data: cities }); // <-- add the `data` option

$('#city-input').select2({ width: '100%' });

$('#city-input').on('select2:select', (event) => {
  const city = event.params.data.text;
  getWeather(city);
});

const city = "Lisboa";
// const country = "pt";

submit.addEventListener('click', getWeatherByCoords);

getWeather(city);
