import * as http from "./../http/http.js";
import * as mainPage from "./../pages/mainPage.js";
const DEFAULT_AUTH_STATE = 0;
const PHONE_AUTH_STATE = 1;
const EMAIL_AUTH_STATE = 2;
const LOGINED = 3;
const LOGIN_ERROR = 4;

let LOGIN = null;
let PASSWORD = null;

export function resetForm() {
  let loginFrom = document.querySelector("#login-form");
  if (!loginFrom) {
    return;
  }
  let input = loginFrom.querySelector(".login-form__input");
  let loginText = loginFrom.querySelector(".login-form__text");
  window.loginStage = 0;
  LOGIN = null;
  PASSWORD = null;
  loginText.innerHTML = "Enter your login";
  input.setAttribute("placeholder", "login");
  input.setAttribute("type", "text");
  input.value = "";
  localStorage.removeItem("token");
}

function isEmail(email) {
  // Регулярний вираз для перевірки формату адреси електронної пошти
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Перевірка, чи відповідає рядок формату адреси електронної пошти
  return emailPattern.test(email);
}

export async function isAuth() {
  let response = await http.updateSession();
  if (response.status != 200) {
    return { auth: false };
  }
  return { auth: true, user: response.data.user };
}

export function closeLoginForm() {
  let loginFormWrapper = document.querySelector(".login-form-wrapper");
  if (!loginFormWrapper) {
    return;
  }
  loginFormWrapper.classList.add("hidden");
  window.loginStage = 0;
}

export function showLoginForm() {
  let loginFormWrapper = document.querySelector(".login-form-wrapper");
  if (!loginFormWrapper) {
    return;
  }
  loginFormWrapper.classList.remove("hidden");
  window.loginStage = 0;
}

export async function checkLogin(loginStage, input) {
  let loginFrom = document.querySelector("#login-form");
  if (!loginFrom) {
    return;
  }
  let loginText = loginFrom.querySelector(".login-form__text");
  let submitButton = document.querySelector(".login-form__button-submit");

  if (loginStage == DEFAULT_AUTH_STATE) {
    let isLoginEmail = isEmail(input.value);
    if (isLoginEmail) {
      window.loginStage = EMAIL_AUTH_STATE;
      loginText.innerHTML = "Please, enter password";
      input.setAttribute("placeholder", "password");
      input.setAttribute("type", "password");
    } else {
      let response = await http.login(input.value);
      if (response.status != 200) {
        return { loginStage: LOGIN_ERROR };
      }
      window.loginStage = PHONE_AUTH_STATE;
      loginText.innerHTML = "We have sent a code to your phone number";
      input.setAttribute("placeholder", "4-digits code");
    }
    LOGIN = input.value;
    input.value = "";
    submitButton.innerHTML = "Login";
    return { loginStage: window.loginStage };
  } else if (loginStage == PHONE_AUTH_STATE) {
    PASSWORD = input.value;
    console.log(PASSWORD, LOGIN);
    let response = await http.loginWithOTP(LOGIN, PASSWORD);
    let user = response.data.user;
    if (response.status != 200) {
      return { loginStage: LOGIN_ERROR };
    }
    return { loginStage: LOGINED, user: user };
  } else if (loginStage == EMAIL_AUTH_STATE) {
    PASSWORD = input.value;
    let response = await http.login(LOGIN, PASSWORD);
    let user = response.data.user;
    if (response.status != 200) {
      return { loginStage: LOGIN_ERROR };
    }
    return { loginStage: LOGINED, user: user };
  }
}
