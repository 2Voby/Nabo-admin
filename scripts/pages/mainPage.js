import * as http from "../http/http.js";

export async function mainPage() {
  let pageContainer = document.querySelector(".page__container");
  if (!pageContainer) {
    return;
  }
  pageContainer.innerHTML = createMainPageHtml();

  let select = pageContainer.querySelector("#select-type");
  if (!select) {
    return;
  }
  select.addEventListener("change", function (e) {
    console.log(e.target.value);
    let selected = e.target.value;
    if (selected == "users") {
      showUsers();
    } else if (selected == "address") {
      showAddress();
    } else if (selected == "parcel") {
      showParcels();
    } else if (selected == "reseivers-req") {
      showReceiversRequests();
    }
  });
  showUsers();
}

function createMainPageHtml() {
  let page = `<div class="admin__filter-menu filter-menu">
    <select name="" id="select-type">
      <option value="users">Users</option>
      <option value="address">Addresses</option>
      <option value="parcel">Parcel</option>
      <option value="reseivers-req">Receiver Requests</option>
    </select>
    <!-- <select name="" id="">
    </select> 
    <input type="text" placeholder="filter by email or phone" /> -->
  </div>
  <div class="admin__filter-body filter-body">
    
  </div>`;
  return page;
}

async function showUsers() {
  let filterBody = document.querySelector(".filter-body");
  if (!filterBody) {
    return;
  }

  let response = await http.getUsers();
  if (response.status != 200) {
    return alert("Error while getting information");
  }
  let usersArray = response.data;
  filterBody.innerHTML = "";
  usersArray.forEach((user) => {
    let userElement = document.createElement("div");
    userElement.classList.add("filter-body__item", "user-item");
    userElement.innerHTML = `<div class="user-item__avatar">
    <img src="${user.avatarUrl}" alt="" />
    </div>
    <div class="user-item__content item-content">
      <p class="item-content__id">${user._id}</p>
      <h3 class="item-content__name">${
        user.firstname + " " + user.lastname
      }</h3>
      <h3 class="item-content__role receiver">${UserStatusToStr(
        user.status
      )}</h3>
      <p class="item-content__text item-content__email">
        Email: <span>${user.email}</span>
      </p>
      <p class="item-content__text item-content__phone">
        Phone: <span>${user.phoneNumber}</span>
      </p>
    </div>
    <div class="user-item__infoButtons"></div>`;

    filterBody.appendChild(userElement);
  });
}

async function showReceiversRequests() {
  let filterBody = document.querySelector(".filter-body");
  if (!filterBody) {
    return;
  }

  let response = await http.getReceiversRequests();
  if (response.status != 200) {
    return alert("Error while getting information");
  }
  let requestsArray = response.data;
  console.log(requestsArray);
  filterBody.innerHTML = "";
  requestsArray.forEach((request) => {
    let userRequestElement = document.createElement("div");
    userRequestElement.classList.add("filter-body__item", "user-item");

    request.requestedDocuments.documents.forEach((document) => {
      userRequestElement.innerHTML += `<img src=${document.url}>`;
    });

    userRequestElement.innerHTML += `<div class="user-item__avatar">
    <img src="${request.user.avatarUrl}" alt="" />
    </div>
    <div class="user-item__content item-content">
      <p class="item-content__id">${request.user._id}</p>
      <h3 class="item-content__name">${
        request.user.firstname + " " + request.user.lastname
      }</h3>
      <h3 class="item-content__role receiver">${UserStatusToStr(
        request.user.status
      )}</h3>
      <p class="item-content__text item-content__email">
        Email: <span>${request.user.email}</span>
      </p>
      <p class="item-content__text item-content__phone">
        Phone: <span>${request.user.phoneNumber}</span>
      </p>
    </div>
    <div class="user-item__infoButtons"></div>`;

    filterBody.appendChild(userRequestElement);
  });
}

async function showAddress() {
  let filterBody = document.querySelector(".filter-body");
  if (!filterBody) {
    return;
  }
  let response = await http.getAddresses();
  if (response.status != 200) {
    return alert("Error while getting information");
  }
  let addressesArray = response.data;
  console.log(addressesArray);
  filterBody.innerHTML = "";

  addressesArray.forEach((address) => {
    let addressElement = document.createElement("div");
    addressElement.classList.add("filter-body__item", "address-item");
    addressElement.innerHTML = `
    <div class="user-item__content item-content">
      <p class="item-content__text item-content__id">${address._id}</p>
      <p class="item-content__text item-content__owner">
      Postcode: <span>${address.postcode}</span>
      </p>
      <h3 class="item-content__address">${address.full_address}</h3>
      <p class="item-content__role receiver">${AdressStatusToStr(
        address.status
      )}</p>
      <p class="item-content__text item-content__owner">
        Owner Id: <span>${address.ownerUserId}</span>
      </p>
      <p class="item-content__text">
      rate: <span>${address.rate}</span>
      </p>
      <br>
      <p class="item-content__text">
      Collecting availability
      </p>
      <p class="item-content__text">
      Morning: <span>${address.collectingMorning}</span>
      </p>
      <p class="item-content__text">
      Afternun: <span>${address.collectingAfternoon}</span>
      </p>
      <p class="item-content__text">
      Evening: <span>${address.collectingEvening}</span>
      </p>
      <br>
      <p class="item-content__text">
      Delivery availability
      </p>
      <p class="item-content__text">
      Sunday: <span>${address.deliverySunday}</span>
      </p>
      <p class="item-content__text">
      Monday: <span>${address.deliveryMonday}</span>
      </p>
      <p class="item-content__text">
      Tuesday: <span>${address.deliveryTuesday}</span>
      </p>
      <p class="item-content__text">
      Wednesday: <span>${address.deliveryWednesday}</span>
      </p>
      <p class="item-content__text">
      Thursday: <span>${address.deliveryThursday}</span>
      </p>
      <p class="item-content__text">
      Friday: <span>${address.deliveryFriday}</span>
      </p>
      <p class="item-content__text">
      Sunday: <span>${address.deliverySunday}</span>
      </p>

    </div>
    <div class="user-item__infoButtons"></div>`;

    filterBody.appendChild(addressElement);
  });
}

async function showParcels() {
  let filterBody = document.querySelector(".filter-body");
  if (!filterBody) {
    return;
  }
  let response = await http.getParcels();
  if (response.status != 200) {
    return alert("Error while getting information");
  }
  let parcelsArray = response.data;
  filterBody.innerHTML = "";

  parcelsArray.forEach((parcel) => {
    console.log(parcel);
    let parcelElement = document.createElement("div");
    parcelElement.classList.add("filter-body__item", "address-item");
    parcelElement.innerHTML = `
    <div class="user-item__content item-content">
      <p class="item-content__text item-content__id">${parcel._id}</p>
      <p class="item-content__text item-content__owner">
      Address Id: <span>${parcel.receiverAddressId}</span>
      </p>  
      <h3 class="item-content__address">Sender Id: ${parcel.senderId}</h3>
      <p class="item-content__role receiver">${parcelStatusToStr(
        parcel.status
      )}</p>
      <p class="item-content__text ">
        Status changed: <span>${parcel.statusChangedAt}</span>
      </p>
      <p class="item-content__text ">
        Delivered at: <span>${parcel.createdAt}</span>
      </p>
      <p class="item-content__text ">
        Comes at: <span>${parcel.deliveryDateExpected}</span>
      </p>
      <p class="item-content__text ">
        TrackingNumber: <span>${parcel.deliveryCompanyTrackingNumber}</span>
      </p>
    </div>
    <div class="user-item__infoButtons"></div>`;

    filterBody.appendChild(parcelElement);
  });
}

function UserStatusToStr(status) {
  let statusStr = "Sender";
  switch (status) {
    case 0:
      statusStr = "Sender";
      break;
    case 1:
      statusStr = "Receiver pending";
      break;
    case 2:
      statusStr = "Receiver";
      break;
  }
  return statusStr;
}

function AdressStatusToStr(status) {
  let statusStr = "Own addres";
  switch (status) {
    case 0:
      statusStr = "Own addres";
      break;
    case 1:
      statusStr = "Pending Receiving";
      break;
    case 2:
      statusStr = "Receiving";
      break;
  }
  return statusStr;
}

function parcelStatusToStr(status) {
  let statusStr = "not submitted";
  switch (status) {
    case 1:
      statusStr = "Booked";
      break;
    case 2:
      statusStr = "On the way";
      break;
    case 3:
      statusStr = "Received";
      break;
    case 4:
      statusStr = "Collected";
      break;
    case 5:
      statusStr = "Canceled";
      break;
  }

  return statusStr;
}
