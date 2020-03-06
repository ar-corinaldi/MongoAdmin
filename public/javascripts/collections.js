const select = document.getElementById("databases");
const selectCollection = document.getElementById("collections");

let dbName = select.value;
let collection = selectCollection.value;
let url = "/databases/" + dbName + "/" + collection;

select.addEventListener("change", () => {
  dbName = select.value;
  console.log("fetch");
  realizarFetchDB(dbName);
});

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

selectCollection.addEventListener("change", () => {
  dbName = select.value;
  collection = selectCollection.value;
  url = "/databases/" + dbName + "/" + collection;
  realizarFetchCollection(url);
});

const renderDataCollections = data => {
  console.log(data);
  addTableHeaders(data);
  addTableContent(data);
  createForm(data);
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
  console.log("element", element);
  for (let prop in element) {
    let th = document.createElement("th");
    tr.appendChild(th);
    th.textContent = prop;
  }
};

const createForm = data => {
  let form = document.getElementById("form");
  const currentForm = document.querySelectorAll("form > div");
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

const realizarFetchDB = dbName => {
  fetch("/databases/" + dbName)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCollections(data);
    })
    .catch(err => console.log(err));
};

const realizarFetchCollection = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderDataCollections(data);
    })
    .catch(err => console.log(err));
};

let _id = "";
const butDelete = document.getElementById("butDelete");
butDelete.addEventListener("click", () => {
  fetch("/delete/"+_id);
});

const inputId = document.getElementById("_id");
inputId.addEventListener("input", (e) => {
  console.log(e.srcElement.value);
  const content = document.querySelectorAll("#table-content > tr > td");  
  const vals = document.querySelectorAll("#table-content > tr > td[id^='"+e.srcElement.value +"']");
  content.forEach( element => {
    console.log("entra aca");
    element.setAttribute("style", "color:black;");
  });
  vals.forEach(element => {
    console.log(element);
    element.setAttribute("style", "color:yellow;");
    _id = element.textContent;
  });
  
});
