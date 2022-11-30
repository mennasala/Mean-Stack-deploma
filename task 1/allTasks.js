const addUser = document.querySelector("#addUser");
const showUsers = document.querySelector("#showUsers");
const removeUser = document.querySelector("#removeUser");
const editUser = document.querySelector("#editUser");

const fields = ["id", "name", "age", "status"];

const readDataFromStorage = (itemKey = "users", resType = "json") => {
  let data = localStorage.getItem(itemKey);
  if (resType == "json") {
    try {
      data = JSON.parse(data) || [];
    } catch (err) {
      data = [];
    }
  }
  return data;
};
const writeDataToStorage = (data, itemKey = "users") =>
  localStorage.setItem(itemKey, JSON.stringify(data));

if (addUser) {
  addUser.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {};
    fields.forEach((i) => (user[i] = addUser.elements[i].value));
    const data = readDataFromStorage();
    data.push(user);
    writeDataToStorage(data);
  });
}

if (showUsers) {
  const data = readDataFromStorage();
  data.forEach((obj) => {
    const p = document.createElement("p");
    p.innerText =
      "ID: " +
      obj.id +
      " /   Name: " +
      obj.name +
      " /  Age: " +
      obj.age +
      " /  Status: " +
      obj.status;
    showUsers.appendChild(p);
  });
}

if (removeUser) {
  removeUser.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = readDataFromStorage();
    const ID = removeUser.elements["id"].value;
    const idx = data.findIndex((el) => {
      return el.id == ID;
    });
    const p = document.createElement("p");
    if (idx >= 0) {
      console.log(idx);
      // slice takes the start and end of the range I want to delete
      data = data.slice(idx, idx);
      console.log(idx, data);
      localStorage.setItem("users", JSON.stringify(data));
      p.innerText = "Successfully deleted 🥳🤩";
    } else {
      p.innerText = "Sorry This ID is not found";
    }
    removeUser.appendChild(p);
  });
}

if (editUser) {
  editUser.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = readDataFromStorage();
    const ID = editUser.elements["id"].value;
    const status = editUser.elements["status"].value;
    const idx = data.findIndex((el) => {
      return el.id == ID;
    });
    const p = document.createElement("p");
    if (idx >= 0) {
      data[idx]["status"] = status;
      localStorage.setItem("users", JSON.stringify(data));
      p.innerText = "Successfully Edited 🥳🤩";
    } else {
      p.innerText = "Sorry This ID is not found";
    }
    editUser.appendChild(p);
  });
}
