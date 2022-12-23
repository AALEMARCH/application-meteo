let btn = document.getElementsByClassName("ApiTest");

btn[0].addEventListener("click", (e) => {
  e.preventDefault();

  let input = document.getElementById("name").value;

  const APIKEY = "84e4aef03092973b527b8bfa07fe33b5";

  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${APIKEY}`;

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

          const iqaValue = document.querySelector(".hautDePage__indice");
          iqaValue.textContent = `IQA ${IQ.list[0].main.aqi}`;
        });

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}&units=metric`
      )
        .then((res) => res.json())
        .then((meteo) => {
          console.log(meteo);
        });
    });
});
