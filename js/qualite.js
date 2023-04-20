// Récupération des infos du localStorage
let iqaRecovery = JSON.parse(localStorage.getItem("iqa"));

let iqaTarget = document.querySelector(".iqa__indice");

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
  // window.location.pathname = "/index.html";
});
