let inputUpdateId = null;
const select = document.getElementById("databases");
const selectCollection = document.getElementById("collections");

let dbName = select.value;
let collection = selectCollection.value;
let url = "/databases/" + dbName + "/" + collection;

// Event to fetch collections when a database change
select.addEventListener("change", () => {
  dbName = select.value;
  realizarFetchDB(dbName);
});

// Render the select with valid options collections from the DB
const renderCollections = data => {
  const currentCollections = document.querySelectorAll("#collections > option");
  currentCollections.forEach(col => {
    col.parentNode.removeChild(col);
  });
  const defaultOpcion = document.createElement("option");
  defaultOpcion.textContent = "---";
  selectCollection.appendChild(defaultOpcion);
  data.forEach(col => {
    const option = document.createElement("option");
    option.textContent = col.name;
    selectCollection.appendChild(option);
  });
};

// Event to do the fetch when a collection change
selectCollection.addEventListener("change", () => {
  dbName = select.value;
  collection = selectCollection.value;
  url = "/databases/" + dbName + "/" + collection;
  realizarFetchCollection(url);
});

// Render de records of the data and create the forms
const renderDataCollections = data => {
  // Add headers of the collection dynamically
  addTableHeaders(data);
  // Add content of the collection dynamically
  addTableContent(data);
  // Create a form to create a new record
  createForm(data);
  // Create a form to update a record
  createFormUpdate(data);

  // Code of special featured
  inputUpdateId = document.getElementById("_idUpdate");
  inputUpdateId.addEventListener("input", e => {
    const content = document.querySelectorAll("#table-content > tr > td");
    const vals = document.querySelectorAll(
      "#table-content > tr > td[id^='" + e.srcElement.value + "']"
    );
    content.forEach(element => {
      element.setAttribute("style", "color:black;");
    });
    vals.forEach(element => {
      element.setAttribute("style", "color:yellow;");
      _id = element.textContent;
    });
  });
};

const addTableContent = data => {
  const currentCollections = document.querySelectorAll("#table-content > tr");
  currentCollections.forEach(col => {
    col.parentNode.removeChild(col);
  });
  let tbody = document.getElementById("table-content");
  // Iterating over every line of the json file
  data.forEach(element => {
    // tr elment
    let tr = document.createElement("tr");
    tbody.appendChild(tr);

    // Iterating through the properties of every json
    for (let prop in element) {
      let td = document.createElement("td");
      td.setAttribute("id", element[prop]);
      tr.appendChild(td);
      td.textContent = `${element[prop]}`;
    }
  });
};

const addTableHeaders = data => {
  let thead = document.getElementById("table-headers");
  const currentTableHeaders = document.querySelector("#table-headers > tr");
  if (currentTableHeaders)
    currentTableHeaders.parentNode.removeChild(currentTableHeaders);
  // Iterating over every line of the json file
  let tr = document.createElement("tr");
  thead.appendChild(tr);
  let element = {};
  if (data.length > 0) element = data[0];
  // Iterating through the properties of every json
  for (let prop in element) {
    let th = document.createElement("th");
    tr.appendChild(th);
    th.textContent = prop;
  }
};

const createFormUpdate = data => {
  let form = document.getElementById("form-update");
  const currentForm = document.querySelectorAll("#form-update > div");
  for (let f of currentForm) {
    if (f) f.parentNode.removeChild(f);
  }
  let element = {};
  if (data.length > 0) element = data[0];
  for (let prop in element) {
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");

    const label = document.createElement("label");
    label.textContent = prop;
    label.setAttribute("for", prop);
    const input = document.createElement("input");
    input.setAttribute("required", "true");
    input.setAttribute("name", prop);

    input.setAttribute("id", prop);
    if (prop === "_id") {
      input.setAttribute("placeholder", "Must have the exact _id");
      input.setAttribute("id", prop + "Update");
    }
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
  }
};

const createForm = data => {
  let form = document.getElementById("form");
  const currentForm = document.querySelectorAll("#form > div");
  for (let f of currentForm) {
    if (f) f.parentNode.removeChild(f);
  }
  /*
  <div class="row">
    <div class="form-group">
        <label for="projectName">Project Name</label>
        <input id="projectName" name="projectName" type="text" required>
    </div>
  </div>
  */

  let element = {};
  if (data.length > 0) element = data[0];
  for (let prop in element) {
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");

    const label = document.createElement("label");
    label.textContent = prop;
    label.setAttribute("for", prop);
    const input = document.createElement("input");
    input.setAttribute("required", "true");
    input.setAttribute("name", prop);
    input.setAttribute("id", prop);

    if (prop !== "_id") {
      form.appendChild(div);
      div.appendChild(label);
      div.appendChild(input);
    }
  }
};

// Fetch to render DB collections
const realizarFetchDB = dbName => {
  fetch("/databases/" + dbName)
    .then(res => res.json())
    .then(data => {
      renderCollections(data);
    })
    .catch(err => console.log(err));
};

// Fetch to render data from collections
const realizarFetchCollection = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderDataCollections(data);
    })
    .catch(err => console.log(err));
};

let _id = "";
// When button delete click do a fetch
const butDelete = document.getElementById("butDelete");
butDelete.addEventListener("click", () => {
  fetch("/delete/" + _id)
    .then(window.location.reload());
});

// Code to featured for delete
const inputId = document.getElementById("_idDelete");
inputId.addEventListener("input", e => {
  const content = document.querySelectorAll("#table-content > tr > td");
  const vals = document.querySelectorAll(
    "#table-content > tr > td[id^='" + e.srcElement.value + "']"
  );
  content.forEach(element => {
    element.setAttribute("style", "color:black;");
  });
  vals.forEach(element => {
    element.setAttribute("style", "color:yellow;");
    _id = element.textContent;
  });
});
