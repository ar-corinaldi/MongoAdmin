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
  let size = { cont: 0};
  addTableHeaders(data, size);
  addTableContent(data, size);
};

const addTableContent = (data, size) => {
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
    let i = 0;
    for (let prop in element) {
      if (i < size.cont) {
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = `${element[prop]}`;
      }
      i++;
    }
  });
};

const addTableHeaders = (data, size) => {
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
  console.log(size);
  for (let prop in element) {
    let th = document.createElement("th");
    tr.appendChild(th);
    th.textContent = prop;
    size.cont = size.cont + 1;
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
