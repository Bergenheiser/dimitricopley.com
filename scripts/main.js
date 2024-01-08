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
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    fetch(this.dataset.file)
      .then((response) => response.text())
      .then((data) => {
        document.querySelector("main").innerHTML = data;
      })
      .catch((error) => console.error(error));
  });
});
let langToggle = document.getElementById("langToggle");
langToggle.addEventListener("change", handleLangChange);

function rotateCircleOnScroll() {
  const circle = document.querySelector(".circle");
  const scrollPosition = window.scrollY;

  // Calculate the rotation angle based on the scroll position
  const rotationAngle = scrollPosition * 0.5;

  // Apply the rotation using CSS transform property
  circle.style.transform = `rotate(${rotationAngle}deg)`;
}

// Attach the method to the scroll event
window.addEventListener("scroll", rotateCircleOnScroll);
