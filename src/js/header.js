const themeBtn = document.getElementById("themeBtn");
const themeMoon = document.getElementById("themeMoon");
const themeElipse = document.getElementById("themeElipse");
const themeSun = document.getElementById("themeSun");
const menuBtn = document.getElementById("menu");
const mobMenu = document.getElementById("mobile");
const blind = document.getElementById("blind")
const body = document.querySelector("body")
const backImg = document.getElementById("hero_box1")
const backColor = document.getElementById("hero_box2")
console.log(backColor.attributes.style.nodeValue)

themeBtn.addEventListener("click", () => {
if (themeBtn.dataset.theme === "false") {

    themeMoon.classList.toggle("theme-moon-light");
    themeElipse.classList.toggle("theme-elipse-ligth");
    themeSun.classList.toggle("theme-sun-light");

    themeBtn.dataset.theme = "true"

    
body.classList.add("theme_sunshine");
backImg.classList.add("hero_box1-light")
backColor.attributes.style.nodeValue = "background-color: #F8F8F8"


}else {

    themeMoon.classList.toggle("theme-moon-light");
    themeElipse.classList.toggle("theme-elipse-ligth");
    themeSun.classList.toggle("theme-sun-light");

    themeBtn.dataset.theme = "false"

    body.classList.remove("theme_sunshine");
    backImg.classList.remove("hero_box1-light");
    backColor.attributes.style.nodeValue = "background-color: #0e0e0e"
}
});

menuBtn.addEventListener("click", () => {
mobMenu.classList.remove("is-hidden");
blind.classList.remove("blind-hidden");


})

mobMenu.addEventListener("click", () => {
    mobMenu.classList.add("is-hidden");
    blind.classList.add("blind-hidden")

})