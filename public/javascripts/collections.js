const select = document.getElementById("databases");
select.addEventListener("change", () => {
  const dbName = select.value;

  fetch("/databases/" + dbName)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      render(data);
    });
});

const render = data => {
  const listCol = document.getElementById("collections");

  data.forEach(col => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    listCol.appendChild(li);
    li.textContent = col.name;
  });
};
