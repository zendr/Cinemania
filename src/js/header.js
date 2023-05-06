const themeBtn = document.getElementById("themeBtn");
const themeMoon = document.getElementById("themeMoon");
const themeElipse = document.getElementById("themeElipse");
const themeSun = document.getElementById("themeSun");
const menuBtn = document.getElementById("menu");
const mobMenu = document.getElementById("mobile");
const blind = document.getElementById("blind")


themeBtn.addEventListener("click", () => {
if (themeBtn.dataset.theme === "false") {

    themeMoon.classList.toggle("theme-moon-light");
    themeElipse.classList.toggle("theme-elipse-ligth");
    themeSun.classList.toggle("theme-sun-light");

    themeBtn.dataset.theme = "true"

}else {

    themeMoon.classList.toggle("theme-moon-light");
    themeElipse.classList.toggle("theme-elipse-ligth");
    themeSun.classList.toggle("theme-sun-light");

    themeBtn.dataset.theme = "false"
}
});

menuBtn.addEventListener("click", () => {
mobMenu.classList.remove("is-hidden");
blind.classList.remove("blind-hidden")

})

mobMenu.addEventListener("click", () => {
    mobMenu.classList.add("is-hidden");
    blind.classList.add("blind-hidden")

})