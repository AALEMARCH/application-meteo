// Récupération des infos du localStorage
let iqaRecovery = JSON.parse(localStorage.getItem("iqa"));

// Vérification si une valeur est récupérée depuis le localStorage
if (!iqaRecovery) {
  alert(
    "veuillez selectionner une ville sur la page d'accueil si vous souhaitez connaitre votre indice de qualité de l'air"
  );

  // Modifier les éléments HTML pour afficher un message indiquant qu'aucune ville n'est sélectionnée
  let indice = document.querySelector(".iqa__indice");

  let val = document.querySelector(".iqa__value");

  indice.innerHTML = "Aucune selection";
  indice.style.color = "red";

  val.innerHTML = "Aucune selection";
  val.style.color = "red";
}

// Récupération de l'élément HTML pour l'affichage de l'IQA
let iqaTarget = document.querySelector(".iqa__indice");

// Vérification si une valeur est récupérée depuis le localStorage et modification de l'affichage en conséquence
if (iqaRecovery[0].IQA != "") {
  switch (iqaRecovery[0].IQA) {
    case 1:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - bon`;
      break;
    case 2:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - passable`;
      break;
    case 3:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - modéré`;
      break;
    case 4:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - mauvais`;
      break;
    case 5:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - très mauvais`;
      break;
    default:
      iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - indisponible`;
  }
} else {
  iqaTarget.innerHTML = `IQA : ${iqaRecovery[0].IQA} - indisponible`;
}

// Récupérer l'élément HTML où ajouter les divs
const container = document.querySelector(".iqa__value");

// Vérifier si l'élément existe avant d'ajouter des divs
if (container) {
  // Parcourir chaque paire clé-valeur et créer une div pour chaque à partir de la deuxieme itération
  let counter = 0;
  for (const [cle, valeur] of Object.entries(iqaRecovery[0])) {
    // La première itération de la boucle est ignorée car elle contient l'IQA, qui est affiché ailleurs
    if (counter === 0) {
      counter++;
      continue;
    }
    const div = document.createElement("div");
    div.classList.add("iqa__value--result");
    div.textContent = `${cle}: ${valeur} µg/m³`;
    container.appendChild(div);
  }
} else {
  console.log("L'élément avec l'ID 'container' n'existe pas.");
}

// Suppression du localStorage et retour en page d'accueil
let backButton = document.querySelector(".backHome");

backButton = document.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.href;
});
