var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){t[e]=r},e.parcelRequired7c6=n),n.register("I2Abx",(function(e,r){n("6RiD3");var t=n("bUb57"),o=n("7me8F");const i={closeModal:document.querySelector(".modal__close__btn"),Backdrop:document.querySelector(".backdrop__trailer"),trailerContainer:document.querySelector(".trailer__container"),ModalCont:document.querySelector(".modal__container__trailer")};let d="";function l(e){i.Backdrop.classList.remove("is-hidden"),i.ModalCont.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",s),document.addEventListener("click",c);const r=e.target.dataset.id;d=r,async function(e){(0,o.getMovieById3)(e).then((e=>(trailerMarkup=function(e){const r=e.id,t=e.results.find((e=>"Official Trailer"===e.name)).key;console.log(t);const n=`https://www.youtube.com/embed/${t}`;if(r)return`<iframe class ="trailer__iframe" src="${n}"  frameborder="0" allowfullscreen></iframe>`}(e),i.trailerContainer.innerHTML=trailerMarkup,e))).catch((e=>{i.trailerContainer.innerHTML='<p>We are very sorry! But we couldn’t find the trailer.</p>\n     <div class = "no_trailer"></div>'}))}(r)}function a(e){i.Backdrop.classList.add("is-hidden"),i.ModalCont.classList.add("is-hidden"),document.body.style.overflow="scroll",document.removeEventListener("keydown",s),document.removeEventListener("click",c),console.log("click")}function c(e){e.target===i.Backdrop&&a()}function s(e){"Escape"===e.code&&a()}setTimeout((()=>{t.renderHeroRandomFilm&&document.getElementById("trailer").addEventListener("click",l)}),1e3),i.closeModal.addEventListener("click",a)}));
//# sourceMappingURL=index.19b8c593.js.map
