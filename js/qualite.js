// Récupération des infos du localStorage
let iqaRecovery = JSON.parse(localStorage.getItem("iqa"));

document.querySelector(
  ".iqa__indice"
).innerHTML = `IQA : ${iqaRecovery[0].IQA}`;

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
  window.location.pathname = "/index.html";
});
