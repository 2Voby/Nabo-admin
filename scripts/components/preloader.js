export function createPreloader() {
  let mainPage = document.querySelector("main");
  if (!mainPage) {
    return;
  }
  let loader = mainPage.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
  let newLoader = document.createElement("div");
  newLoader.classList.add("loader");
  mainPage.appendChild(newLoader);
}
export function removePreloader() {
  let mainPage = document.querySelector("main");
  if (!mainPage) {
    return;
  }
  let loader = mainPage.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}
