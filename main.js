const weatherEl = document.querySelector('.weather');

function getDegRotation(degree) {
    return degree + 180;
}

function getWindDeg(degree) {
    let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

    return compassSector[(degree / 22.5).toFixed(0)];
}

function renderWeatherCity(city) {
    const html = `
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-8 col-lg-6 col-xl-4">

                    <div class="card" style="color: #4B515D; border-radius: 35px;">
                        <div class="card-body p-4">

                            <div class="d-flex">
                                <h6 class="flex-grow-1">${city.name}</h6>
                            </div>

                            <div class="d-flex flex-column text-center mt-5 mb-4">
                                <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${Math.ceil(city.main.temp)}°C </h6>
                                <span class="small" style="color: #868B94">${city.weather[0].description}</span>
                                <span class="small" style="color: #868B94">Feels like  ${city.main.feels_like}</span>
                            </div>

                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1" style="font-size: 1rem;">

                                    <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                                        Pressure: ${city.main.pressure}hPa
                                        </span></div>
                                    <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                                        Humidity: ${city.main.humidity}%
                                    </span></div>
                                    <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                                        <svg data-v-47880d39="" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" class="icon-wind-direction" style="height: 10px; transform: rotate(${getDegRotation(city.wind.deg)}deg);"><g data-v-47880d39="" fill="#48484a"><path data-v-47880d39="" d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path><path data-v-47880d39="" d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path></g></svg>
                                        ${city.wind.speed}m/s ${getWindDeg(city.wind.deg)}
                                    </span></div>
                                </div>
                                <div>
                                    <img src="http://openweathermap.org/img/w/${city.weather[0].icon}.png"
                                        width="100px">
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    `

    weatherEl.insertAdjacentHTML('beforeend', html)
}

function showError(error) {
    const html = `
        <div class="container py-5 h-100">
            <h2>${error}</h2>
        </div>
    `

    weatherEl.insertAdjacentHTML('beforeend', html)
}


function getWeatherData(city) {
    const request = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`);

    request.then(data => data.json())
        .then(data => {
            if (data.cod === '404') return showError(data.message)
            renderWeatherCity(data)
        })
        .catch(error => showError(error.message))
}

getWeatherData('odessa')