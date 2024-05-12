// const API_URL = "http://localhost:5050/rest";
const API_URL = "https://nabo.pindocket.com/rest";

const $api = axios.create({
  withCredentials: false,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
    }
    throw error;
  }
);

export async function login(login, password = null) {
  try {
    let response = await $api.post(`/v1/unauthorized/login`, {
      login: login,
      password: password,
    });
    // if (response.status == 200 || response.statusText == "OK") {
    //   console.log(response);
    //   localStorage.setItem("token", response.data.user.accessToken);
    // }
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function loginWithOTP(phone, otpCode) {
  try {
    let response = await $api.post(`/v1/unauthorized/login/otpCode`, {
      phoneNumber: phone,
      otpCode: otpCode,
    });
    if (response.status == 200 || response.statusText == "OK") {
      localStorage.setItem("token", response.data.user.accessToken);
    }
    return response;
  } catch (error) {
    console.log(error.response?.data?.message);
    return error.response;
  }
}

export async function updateSession() {
  try {
    let response = await $api.get("/v1/unauthorized/updateSession");
    return response;
  } catch (error) {
    console.log(error.response?.data);
    return error.response;
  }
}

export async function getUsers() {
  try {
    let response = await $api.get("/v1/admin/getAllUsers");
    return response;
  } catch (error) {
    console.log(error.response?.data);
    return error.response;
  }
}

export async function getAddresses() {
  try {
    let response = await $api.get("/v1/admin/getAllAddresses");
    return response;
  } catch (error) {
    console.log(error.response?.data);
    return error.response;
  }
}

export async function getParcels() {
  try {
    let response = await $api.get("/v1/admin/getAllParcels");
    return response;
  } catch (error) {
    console.log(error.response?.data);
    return error.response;
  }
}
