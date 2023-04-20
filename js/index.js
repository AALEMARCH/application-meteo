const TIME_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
};

function createScrollToTopButton() {
  // boutton scroll to top
  const scrollBtn = document.getElementById("myBtn");

  // Fonction pour obtenir la position actuelle de défilement
  function getScrollPosition() {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  function scrollFunction() {
    if (getScrollPosition() > 20) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }

  // montre le boutton apres 20px de scroll
  window.onscroll = function () {
    scrollFunction();
  };

  // Retour en haut de page
  scrollBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
}

createScrollToTopButton();

// Fonction pour mettre à jour les informations d'horaires
const updateHoraires = (horairesJournee) => {
  // Constante pour les options de formatage des horaires

  // Fonction pour formatter les horaires
  const formatTime = (time) =>
    new Date(time).toLocaleTimeString("fr-fr", TIME_OPTIONS);

  // Vérifier que les données sont valides
  if (!horairesJournee) throw new Error("Données d'horaires manquantes");

  // Récupérer l'élément conteneur des horaires
  const jourHoraire = document.querySelector(".jour__horaire");

  // Supprimer les enfants actuels de l'élément conteneur
  while (jourHoraire.firstChild) {
    jourHoraire.removeChild(jourHoraire.firstChild);
  }

  // boucle pour remplir les informations dans les éléments d'horaires
  for (const horaire of horairesJournee) {
    let horaireIndividuelConteneur = document.createElement("div");
    jourHoraire.appendChild(horaireIndividuelConteneur);
    horaireIndividuelConteneur.setAttribute(
      "class",
      "jour__horaire__container"
    );

    // ajouter une option (aujourdhui / demain) au tableau horaireList
    function isToday(timestamp) {
      let date = new Date(timestamp * 1000);
      let today = new Date();
      return date.toDateString() === today.toDateString();
    }

    let horaireList = [
      isToday(horaire.dt) === true ? "aujourd'hui" : "demain",
      formatTime(horaire.dt_txt),
      `${horaire.main.temp} °C`,
      horaire.weather[0].description,
      `${horaire.wind.speed} km/h`,
    ];

    for (const info of horaireList) {
      let horaireIndividuel = document.createElement("div");
      horaireIndividuelConteneur.appendChild(horaireIndividuel);
      horaireIndividuel.setAttribute(
        "class",
        "jour__horaire__container--value"
      );
      horaireIndividuel.innerHTML = info;
    }
  }
};

// Bouton de sélection de la ville
const btn = document.querySelector(".ApiTest");
const cityInput = document.getElementById("name");
const cityRegex = /^[a-z]*(?:[\s-][a-z]+)*$/i;

function disableButton() {
  btn.disabled = true;
}

function enableButton() {
  btn.disabled = false;
}

// Fonction pour ajouter un message d'erreur
function addErrorMessage() {
  let existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }

  let textValidate = document.createElement("div");
  textValidate.innerText = "Nom de ville invalide";
  textValidate.style.color = "red";

  let form = document.querySelector(".recherche__ville");
  form.insertAdjacentElement("afterend", textValidate);
  textValidate.classList.add("error");
}

// Fonction pour supprimer le message d'erreur
function removeErrorMessage() {
  let existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }
  enableButton();
}

// Validation de la ville
function validateCity() {
  if (cityRegex.test(cityInput.value)) {
    cityInput.style.background = "white";
    removeErrorMessage();
    enableButton();
  } else {
    cityInput.style.background = "red";
    addErrorMessage();
    disableButton();
  }
}

cityInput.addEventListener("input", validateCity);

// Vérifier la validité du champ de saisie au chargement de la page
validateCity();

// Supprimer le message d'erreur si le formulaire est valide
function formIsValid() {
  return cityRegex.test(cityInput.value);
}

document.querySelector("form").addEventListener("submit", (e) => {
  if (!formIsValid()) {
    addErrorMessage();
    disableButton();
    e.preventDefault(); // Empêche la soumission du formulaire si la validation échoue
  } else {
    removeErrorMessage();
  }
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (formIsValid()) {
    // Envoyer la requête AJAX
  } else {
    addErrorMessage();
  }
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // stockage de l'input
  let input = document.getElementById("name").value;

  const APIKEY = "84e4aef03092973b527b8bfa07fe33b5";

  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${APIKEY}`;

  // geocodage du nom de la ville en latitude et longitude
  fetch(geoUrl)
    .then((res) => res.json())
    .then((data) => {
      const cityName = document.querySelector(".hautDePage__ville");
      cityName.textContent = data[0].name;

      // Creer une page au click sur IQA avec tous les indices de pollution detailler
      // appel api des donnée de polution
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((IQ) => {
          const iqaValueS = document.querySelector(".hautDePage__indice");

          // Créer un objet `addLocalStorage` qui contient les données sur la qualité de l'air à stocker
          let addLocalStorage = {
            IQA: IQ.list[0].main.aqi, // L'indice de qualité de l'air
            "monoxyde de carbone": IQ.list[0].components.co,
            "monoxyde d'azote": IQ.list[0].components.no,
            "dioxyde d'azote": IQ.list[0].components.no2,
            Ozone: IQ.list[0].components.o3,
            "dioxyde de souffre": IQ.list[0].components.so2,
            "particules fines": IQ.list[0].components.pm2_5,
            "matières particulaires grossières": IQ.list[0].components.pm10,
            Ammoniac: IQ.list[0].components.nh3,
          };

          // Récupérer les données stockées localement dans le navigateur
          let iqaTable = JSON.parse(localStorage.getItem("iqa"));

          // Si des données existent déjà
          if (iqaTable) {
            localStorage.removeItem("iqa");
            iqaTable = [];
            iqaTable.push(addLocalStorage);
            localStorage.setItem("iqa", JSON.stringify(iqaTable));
          } else {
            iqaTable = [];
            iqaTable.push(addLocalStorage);
            localStorage.setItem("iqa", JSON.stringify(iqaTable));
          }

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
        })
        .catch((error) => {
          console.error(error);
        });

      // appel api de la météo actuelle et conversion en degree celcius
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}&units=metric&lang=fr`
      )
        .then((res) => res.json())
        .then((meteo) => {
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

          // Récupération de la position géographique de l'utilisateur
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Obtention de la date actuelle
              const currentDate = new Date();
              // Obtention des informations sur le lever et le coucher du soleil pour la position géographique donnée
              const url = `https://api.sunrise-sunset.org/json?lat=${
                position.coords.latitude
              }&lng=${position.coords.longitude}&date=${currentDate
                .toISOString()
                .slice(0, 10)}`;
              fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  const sunrise = new Date(
                    `${currentDate.toISOString().slice(0, 10)} ${
                      data.results.sunrise
                    }`
                  );
                  const sunset = new Date(
                    `${currentDate.toISOString().slice(0, 10)} ${
                      data.results.sunset
                    }`
                  );
                  // Comparaison de l'heure actuelle avec l'heure de lever et de coucher du soleil
                  if (currentDate < sunrise || currentDate > sunset) {
                    let valeurMet = meteo.weather[0].description;
                    switch (valeurMet) {
                      case "nuageux":
                        document.body.style.backgroundImage =
                          "url('./media/peuNuageuxNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "peu nuageux":
                        document.body.style.backgroundImage =
                          "url('./media/peuNuageuxNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "légère pluie":
                        document.body.style.backgroundImage =
                          "url('./media/légèrePluieNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "ciel dégagé":
                        document.body.style.backgroundImage =
                          "url('./media/cielDégagéNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "couvert":
                        document.body.style.backgroundImage =
                          "url('./media/couvertNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "bruine légère":
                        document.body.style.backgroundImage =
                          "url('./media/bruineLegereNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "brume":
                        document.body.style.backgroundImage =
                          "url('./media/brumeNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      default:
                        document.body.style.backgroundImage =
                          "url('./media/peuNuageuxNuit.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                    }
                  } else {
                    let valeurMet = meteo.weather[0].description;
                    switch (valeurMet) {
                      case "nuageux":
                        document.body.style.backgroundImage =
                          "url('./media/nuageux.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "peu nuageux":
                        document.body.style.backgroundImage =
                          "url('./media/nuageux.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "légère pluie":
                        document.body.style.backgroundImage =
                          "url('./media/pluie.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "ciel dégagé":
                        document.body.style.backgroundImage =
                          "url('./media/cielDegage.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "black";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "black";
                        break;
                      case "couvert":
                        document.body.style.backgroundImage =
                          "url('./media/couvert.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "black";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "black";
                        break;
                      case "bruine légère":
                        document.body.style.backgroundImage =
                          "url('./media/bruineLegere.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      case "brume":
                        document.body.style.backgroundImage =
                          "url('./media/brume.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                        break;
                      default:
                        document.body.style.backgroundImage =
                          "url('./media/nuageux.webp')";
                        document.querySelector(".hautDePage").style.color =
                          "white";
                        document.querySelector(
                          ".prevision__titreUn"
                        ).style.color = "white";
                    }
                  }
                });
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });

      // Appel API sur 5 jours avec une latence de 3 heures
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKEY}&units=metric&lang=fr`
      )
        .then((res) => res.json())
        .then((prevision) => {
          const previsionContainers = [
            ".prevision__jours__container--dateUn",
            ".prevision__jours__container--dateDeux",
            ".prevision__jours__container--dateTrois",
            ".prevision__jours__container--dateQuatre",
            ".prevision__jours__container--dateCinq",
          ];

          const previsionMeteos = [
            ".prevision__jours__container--meteoUn",
            ".prevision__jours__container--meteoDeux",
            ".prevision__jours__container--meteoTrois",
            ".prevision__jours__container--meteoQuatre",
            ".prevision__jours__container--meteoCinq",
          ];

          const previsionValues = [
            prevision.list[0].dt_txt,
            prevision.list[8].dt_txt,
            prevision.list[16].dt_txt,
            prevision.list[24].dt_txt,
            prevision.list[32].dt_txt,
          ];

          const options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          };

          for (i = 0; i < previsionContainers.length; i++) {
            const previsionContainer = document.querySelector(
              previsionContainers[i]
            );
            const previsionMeteo = document.querySelector(previsionMeteos[i]);
            const date = new Date(previsionValues[i]);

            previsionContainer.textContent = date.toLocaleDateString(
              "fr-fr",
              options
            );
            previsionMeteo.textContent =
              prevision.list[i * 8].weather[0].description;
          }

          // Sélection des horaires sur 24 heures uniquement
          let horaires = prevision.list;
          let horairesJournee = horaires.slice(0, 9);

          updateHoraires(horairesJournee);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});
