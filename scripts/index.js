let main = document.querySelector("main");
cats.forEach(function (cat) {
  let card = `<div class="${cat.favourite ? "card like" : "card"}" 
  style="background-image: url(${cat.img_link})">
     <span>${cat.name}</span>
     </div>`;
  main.innerHTML += card;
});

let cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
  const width = cards[i].offsetWidth;
  cards[i].style.height = width * 0.6 + "px";
}

let addBtn = document.querySelector("#add");
let popupForm = document.querySelector("#popup-form");
let closePopupForm = popupForm.querySelector(".popup-close");

addBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  document.querySelector(".form-img").style.background = getRandomPicture();
  if (!popupForm.classList.contains("active")) {
    popupForm.classList.add("active");
    popupForm.parentElement.classList.add("active");
  }
});

closePopupForm.addEventListener("click", () => {
  popupForm.classList.remove("active");
  popupForm.parentElement.classList.remove("active");
});

const api = new Api("zubkov");
let form = document.forms[0];
form.img_link.addEventListener("change", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.img_link.addEventListener("input", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let body = {};
  for (let i = 0; i < form.elements.length; i++) {
    let inp = form.elements[i];
    if (inp.type === "checkbox") {
      body[inp.name] = inp.checked;
    } else if (inp.name && inp.value) {
      if (inp.type === "number") {
        body[inp.name] = Number(inp.value);
      } else {
        body[inp.name] = inp.value;
      }
    }
  }

let newCard = `<div class="${body.favourite ? "card like" : "card"}" 
style="background-image: url(${body.img_link})">
   <span>${body.name}</span>
   </div>`;
main.innerHTML += newCard;
main.lastElementChild.style.height = main.lastElementChild.offsetWidth * 0.6 + "px";

  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ok") {
        form.reset();
        closePopupForm.click();
      } else {
        console.log(data);
      }
    });
});

function  getRandomPicture() {
  let item = Math.floor(Math.random() * 10) < 5 ? 1 : 2;
  return `url("img/cat${item}.jpg") no-repeat center / cover`;
}