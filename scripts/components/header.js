export function drawUserInfo(user) {
  console.log(user);
  let header = document.querySelector("header");
  if (!header) {
    return;
  }
  let wrapper = header.querySelector(".controlls-header");
  if (!wrapper) {
    return;
  }
  wrapper.innerHTML = `
  <div class="controlls-header__user header-user">
  <div class="header-user__logo">
    <img src="${user.avatarUrl}" alt="avatar" />
  </div>
  <p class="header-user__name">${user.firstname} ${user.lastname[0]}.</p>
</div>
<button class="controlls-header__logout">Logout</button>`;

  let button = wrapper.querySelector(".controlls-header__logout");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    location.reload();
  });
}
