let btn = document.getElementsByClassName("ApiTest");

btn[0].addEventListener("click", (e) => {
  e.preventDefault();

  let input = document.getElementById("name").value;

  const APIKEY = "84e4aef03092973b527b8bfa07fe33b5";

  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${APIKEY}`;

  // geocodage du nom de la ville en latitude et longitude
  fetch(geoUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      console.log(data[0].country);
      console.log(data[0].state);
      console.log(data[0].lat);
      console.log(data[0].lon);

      const htmlValue = document.querySelector(".hautDePage__ville");
      htmlValue.textContent = data[0].name;

      // Creer une page au click sur IQA avec tous les indices de pollution detailler
      // appel api des donnée de polution
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((IQ) => {
          console.log(IQ.list[0].main.aqi); // IQA 1=bon 2=passable 3=modéré 4=mauvais 5=très mauvais
          console.log(IQ.list[0].components.co); // monoxyde de carbone µg/m³
          console.log(IQ.list[0].components.no); // monoxyde d'azote µg/m³
          console.log(IQ.list[0].components.no2); // dioxyde d'azote µg/m³
          console.log(IQ.list[0].components.o3); // Ozone µg/m³
          console.log(IQ.list[0].components.so2); // dioxyde de souffre µg/m³
          console.log(IQ.list[0].components.pm2_5); // particules fines µg/m³
          console.log(IQ.list[0].components.pm10); // matières particulaires grossières µg/m³
          console.log(IQ.list[0].components.nh3); // Ammoniac µg/m³

          const iqaValueS = document.querySelector(".hautDePage__indice");

          // Switch Case pour la selection des valeur d'indice de qualité de l'air
          let valeur = IQ.list[0].main.aqi;
          if (valeur != "") {
            switch (valeur) {
              case 1:
                iqaValueS.textContent = `IQA 1 - bon`;
                break;
              case 2:
                iqaValueS.textContent = `IQA 2 - passable`;
                break;
              case 3:
                iqaValueS.textContent = `IQA 3 - modéré`;
                break;
              case 4:
                iqaValueS.textContent = `IQA 4 - mauvais`;
                break;
              case 5:
                iqaValueS.textContent = `IQA 5 - très mauvais`;
                break;
              default:
                iqaValueS.textContent = `IQA - indisponible`;
            }
          } else {
            iqaValueS.textContent = `IQA - indisponible`;
          }
        });

      // appel api de la météo actuelle et conversion en degree celcius
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}&units=metric&lang=fr`
      )
        .then((res) => res.json())
        .then((meteo) => {
          console.log(meteo);

          // ont défini les selecteur avec un S comme Selecteur
          const meteoS = document.querySelector(".hautDePage__temps");
          const temperatureS = document.querySelector(
            ".hautDePage__degre--style"
          );
          const ressentieS = document.getElementById("ressentie");
          const humiditeS = document.getElementById("humidite");
          const pressionS = document.getElementById("pression");
          const vitesseVentS = document.getElementById("vent");

          // ont crée des variables pour les valeurs numériques afin d'arrondir le resultat à l'entier le plus proche
          let degValue = meteo.main.temp;
          let ressentieValue = meteo.main.feels_like;
          let humiditeValue = meteo.main.humidity;
          let pressionValue = meteo.main.pressure;
          let vitesseVentValue = meteo.wind.speed;

          // ont écrit le résultat dans le html
          meteoS.textContent = meteo.weather[0].description;
          temperatureS.textContent = Math.round(degValue);
          ressentieS.textContent = Math.round(ressentieValue);
          humiditeS.textContent = Math.round(humiditeValue);
          pressionS.textContent = Math.round(pressionValue);
          vitesseVentS.textContent = Math.round(vitesseVentValue * 100) / 100;
        });

      // Appel API sur 5 jours avec une latence de 3 heures
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((prevision) => {
          console.log(prevision);
        });
    });
});
