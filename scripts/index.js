import * as loginForm from "./components/loginForm.js";
import * as loader from "./components/preloader.js";
import * as header from "./components/header.js";
import * as mainPage from "./pages/mainPage.js";
const DEFAULT_AUTH_STATE = 0;
const PHONE_AUTH_STATE = 1;
const EMAIL_AUTH_STATE = 2;
const LOGINED = 3;
const LOGIN_ERROR = 4;

main();
async function main() {
  loader.createPreloader();
  let { auth, user } = await loginForm.isAuth();
  loader.removePreloader();
  if (auth && user.roles.includes("ADMIN")) {
    loginForm.closeLoginForm();
    header.drawUserInfo(user);
    mainPage.mainPage();
  } else {
    loginForm.showLoginForm();
    let loginFrom = document.querySelector("#login-form");
    if (!loginFrom) {
      return;
    }
    let submitButton = loginFrom.querySelector(".login-form__button-submit");
    submitButton.addEventListener("click", async function (e) {
      let loginStage = window.loginStage;
      e.preventDefault();
      let input = loginFrom.querySelector(".login-form__input");
      let loginResponse = await loginForm.checkLogin(+loginStage, input);
      if (loginResponse.loginStage == LOGIN_ERROR) {
        alert("Error while logining. Try again later");
        loginForm.resetForm();
      }
      if (loginResponse.loginStage == LOGINED) {
        let user = loginResponse.user;
        if (user.roles.includes("ADMIN")) {
          loginForm.closeLoginForm();
          header.drawUserInfo(user);
          mainPage.mainPage();
        } else {
          alert("You does not have an admin role");
          loginForm.resetForm();
        }
      }
    });
  }
}
