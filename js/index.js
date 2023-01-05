// boutton scroll to top
let mybutton = document.getElementById("myBtn");

// montre le boutton apres 20px de scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Retour en haut de page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// boutton de selection de la ville
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

          //selection de l'image de fond suivant la météo
          let valeurMet = meteo.weather[0].description;
          switch (valeurMet) {
            case "nuageux":
              document.body.style.backgroundImage =
                "url('./media/nuageux.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
              break;
            case "peu nuageux":
              document.body.style.backgroundImage =
                "url('./media/nuageux.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
              break;
            case "légère pluie":
              document.body.style.backgroundImage =
                "url('./media/légèrePluie.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
              break;
            case "ciel dégagé":
              document.body.style.backgroundImage =
                "url('./media/cielDégagé.webp')";
              document.querySelector(".hautDePage").style.color = "black";
              document.querySelector(".prevision__titreUn").style.color =
                "black";
              break;
            case "couvert":
              document.body.style.backgroundImage =
                "url('./media/couvert.webp')";
              document.querySelector(".hautDePage").style.color = "black";
              document.querySelector(".prevision__titreUn").style.color =
                "black";
              break;
            case "bruine légère":
              document.body.style.backgroundImage =
                "url('./media/bruineLégère.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
              break;
            case "brume":
              document.body.style.backgroundImage =
                "url('./media/bruineLégère.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
              break;
            default:
              document.body.style.backgroundImage =
                "url('./media/nuageux.webp')";
              document.querySelector(".hautDePage").style.color = "white";
              document.querySelector(".prevision__titreUn").style.color =
                "white";
          }
        });

      // Appel API sur 5 jours avec une latence de 3 heures
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}&units=metric&lang=fr`
      )
        .then((res) => res.json())
        .then((prevision) => {
          console.log(prevision);

          const previsionUn = document.querySelector(
            ".prevision__jours__container--dateUn"
          );
          const previsionDeux = document.querySelector(
            ".prevision__jours__container--dateDeux"
          );
          const previsionTrois = document.querySelector(
            ".prevision__jours__container--dateTrois"
          );
          const previsionQuatre = document.querySelector(
            ".prevision__jours__container--dateQuatre"
          );
          const previsionCinq = document.querySelector(
            ".prevision__jours__container--dateCinq"
          );

          const previsionMeteoUn = document.querySelector(
            ".prevision__jours__container--meteoUn"
          );
          const previsionMeteoDeux = document.querySelector(
            ".prevision__jours__container--meteoDeux"
          );
          const previsionMeteoTrois = document.querySelector(
            ".prevision__jours__container--meteoTrois"
          );
          const previsionMeteoQuatre = document.querySelector(
            ".prevision__jours__container--meteoQuatre"
          );
          const previsionMeteoCinq = document.querySelector(
            ".prevision__jours__container--meteoCinq"
          );

          let previsionUnValue = prevision.list[0].dt_txt;
          let previsionDeuxValue = prevision.list[8].dt_txt;
          let previsionTroisValue = prevision.list[16].dt_txt;
          let previsionQuatreValue = prevision.list[24].dt_txt;
          let previsionCinqValue = prevision.list[32].dt_txt;

          const dateUn = new Date(previsionUnValue);
          const dateDeux = new Date(previsionDeuxValue);
          const dateTrois = new Date(previsionTroisValue);
          const dateQuatre = new Date(previsionQuatreValue);
          const dateCinq = new Date(previsionCinqValue);

          const options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          };

          previsionUn.textContent = dateUn.toLocaleDateString("fr-fr", options);
          previsionMeteoUn.textContent =
            prevision.list[0].weather[0].description;

          previsionDeux.textContent = dateDeux.toLocaleDateString(
            "fr-fr",
            options
          );
          previsionMeteoDeux.textContent =
            prevision.list[8].weather[0].description;

          previsionTrois.textContent = dateTrois.toLocaleDateString(
            "fr-fr",
            options
          );
          previsionMeteoTrois.textContent =
            prevision.list[16].weather[0].description;

          previsionQuatre.textContent = dateQuatre.toLocaleDateString(
            "fr-fr",
            options
          );
          previsionMeteoQuatre.textContent =
            prevision.list[24].weather[0].description;

          previsionCinq.textContent = dateCinq.toLocaleDateString(
            "fr-fr",
            options
          );
          previsionMeteoCinq.textContent =
            prevision.list[32].weather[0].description;

          // selection des horaires sur 24 heures uniquement
          let horaires = prevision.list;
          let horairesJournée = horaires.slice([0], [9]);
          console.log(horairesJournée);

          const jourHoraire = document.querySelector(".jour__horaire");

          for (const element of horairesJournée) {
            let horaireIndividuelConteneur = document.createElement("div");
            jourHoraire.appendChild(horaireIndividuelConteneur);
            horaireIndividuelConteneur.setAttribute(
              "class",
              "jour__horaire__container"
            );

            let heures = element.dt_txt.slice(10, 16);

            let horaireArray = [];
            horaireArray.push(heures);
            horaireArray.push(`${element.main.temp} °C`);
            horaireArray.push(element.weather[0].description);
            horaireArray.push(`${element.wind.speed} km/h`);
            console.log(horaireArray);

            for (const element of horaireArray) {
              let horaireIndividuel = document.createElement("div");
              horaireIndividuelConteneur.appendChild(horaireIndividuel);
              horaireIndividuel.setAttribute(
                "class",
                "jour__horaire__container--value"
              );
              horaireIndividuel.innerHTML = element;
            }
          }
        });
    });
});
