/*Toggle switch logic*/

async function handleLangChange() {
  switch (this.checked) {
    case false:
      Array.from(document.getElementsByClassName("eng")).forEach((elem) =>
        elem.classList.add("hidden")
      );
      Array.from(document.getElementsByClassName("fr")).forEach((elem) =>
        elem.classList.remove("hidden")
      );
      break;

    case true:
      Array.from(document.getElementsByClassName("fr")).forEach((elem) =>
        elem.classList.add("hidden")
      );
      Array.from(document.getElementsByClassName("eng")).forEach((elem) =>
        elem.classList.remove("hidden")
      );
      break;
  }
}
function uncheckToggleSwitch() {
  let langToggle = document.getElementById("langToggle");
  langToggle.checked = false;
}

let langToggle = document.getElementById("langToggle");
langToggle.addEventListener("change", handleLangChange);
window.addEventListener("load", uncheckToggleSwitch);

/* Ayant voulu experimenter avec le routage des liens par insertion de contenu 
(à l'inverse d'une redirection) parceque "la bande passante c'est du charbon!" [N. VIEVILLE - 2023]
le code suivant fait donc ce qu'un onclick en html aurait très bien pu faire, 
mais pourquoi faire simple quand on peux faire compli... javascript?*/

document.querySelectorAll("nav a").forEach((link, index) => {
  if (index < 2) {
    //Oui tout a fait, je me suis mis dans un sacré bourbier (mais c'est joli sinon?)
    link.addEventListener("click", function (event) {
      event.preventDefault();
      fetch(this.dataset.file)
        .then((response) => response.text())
        .then((data) => {
          document.querySelector("main").innerHTML = data;
        })
        .catch((error) => console.error(error));
    });
  }
});

let arrow = document.getElementById("arrow");
arrow.addEventListener("click", function (event) {
  event.preventDefault();
  fetch(this.dataset.file)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("main").innerHTML = data;
    })
    .catch((error) => console.error(error));
});
