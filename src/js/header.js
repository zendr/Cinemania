const themeBtn = document.getElementById("themeBtn");
const themeMoon = document.getElementById("themeMoon");
const themeElipse = document.getElementById("themeElipse");
const themeSun = document.getElementById("themeSun");
const menuBtn = document.getElementById("menu");
const mobMenu = document.getElementById("mobile");
const blind = document.getElementById("blind")
const body = document.querySelector("body")
const backImg = document.getElementById("hero_box1")
const backColor = document.getElementById("hero_box2");
const hero = document.querySelector(".hero");
// console.log(hero)

function themeKit () {
    if (themeBtn.dataset.theme === "false") {
    
        themeMoon.classList.toggle("theme-moon-light");
        themeElipse.classList.toggle("theme-elipse-ligth");
        themeSun.classList.toggle("theme-sun-light");
    
        themeBtn.dataset.theme = "true"
    
        
    body.classList.add("theme_sunshine");
    if (hero !== null){
        backImg.classList.add("hero_box1-light");
        backColor.attributes.style.nodeValue = "background-color: #F8F8F8";
    }
    localStorage.setItem("ui-theme", "light");
    
    
    }else {
    
        themeMoon.classList.toggle("theme-moon-light");
        themeElipse.classList.toggle("theme-elipse-ligth");
        themeSun.classList.toggle("theme-sun-light");
    
        themeBtn.dataset.theme = "false"
    
        body.classList.remove("theme_sunshine");
        if (hero !== null) {
            backImg.classList.remove("hero_box1-light");
            backColor.attributes.style.nodeValue = "background-color: #0e0e0e"
        }
        localStorage.setItem("ui-theme", "dark");
    }
    }

if(localStorage.getItem("ui-theme") === "light") {
    themeKit();
}


themeBtn.addEventListener("click", themeKit);

menuBtn.addEventListener("click", () => {
mobMenu.classList.remove("is-hidden");
blind.classList.remove("blind-hidden");


})

mobMenu.addEventListener("click", () => {
    mobMenu.classList.add("is-hidden");
    blind.classList.add("blind-hidden")

})