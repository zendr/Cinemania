var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var r=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,o){n[e]=o},e.parcelRequired7c6=r),r.register("I2Abx",(function(e,o){r("6RiD3");var n=r("bUb57"),t=r("7me8F");const l={closeModal:document.querySelector(".modal__close__btn"),Backdrop:document.querySelector(".backdrop__trailer"),trailerContainer:document.querySelector(".trailer__container"),ModalCont:document.querySelector(".modal__container__trailer")};let i="";function c(e){l.Backdrop.classList.remove("is-hidden"),l.ModalCont.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",s),document.addEventListener("click",a);const o=e.target.dataset.id;i=o,async function(e){const o=(0,t.getMovieById3)(e);console.log(e+"createMarkup"),console.log(o+"film"),o.then((e=>(trailerMarkup=function(e){const o=e.id,n=e.results.find((e=>"Official Trailer"===e.name));console.log(n),console.log(e.id);const r=n.key;console.log(r);const t=`https://www.youtube.com/embed/${r}`;if(o)return console.log(o),`<iframe class ="trailer__iframe" src="${t}"  frameborder="0" allowfullscreen></iframe>`}(e),l.trailerContainer.innerHTML=trailerMarkup,console.log(e),e))).catch((e=>{console.log(e),l.trailerContainer.innerHTML='<p>We are very sorry! But we couldn’t find the trailer.</p>\n     <div class = "no_trailer"></div>'}))}(o),console.log(o)}function d(e){l.Backdrop.classList.add("is-hidden"),l.ModalCont.classList.add("is-hidden"),document.body.style.overflow="scroll",document.removeEventListener("keydown",s),document.removeEventListener("click",a),console.log("click")}function a(e){e.target===l.Backdrop&&d()}function s(e){"Escape"===e.code&&d()}setTimeout((()=>{n.renderHeroRandomFilm&&document.getElementById("trailer").addEventListener("click",c)}),1e3),l.closeModal.addEventListener("click",d)}));
//# sourceMappingURL=index.fd131625.js.map
