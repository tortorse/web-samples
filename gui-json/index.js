const jsonInput = document.querySelector("#json");

let jsonString = jsonInput.value;

jsonInput.addEventListener("change", (e) => {
  jsonString = e.target.value;
});
const getCategoryButton = document.querySelector("#get-category");

const result = document.querySelector("#result");

getCategoryButton.addEventListener("click", () => {
  result.innerHTML = getCategories(jsonString);
});

const getTagsButton = document.querySelector("#get-tags");

getTagsButton.addEventListener("click", () => {
  result.innerHTML = getComponentsTag(jsonString);
});

const getNamesButton = document.querySelector("#get-names");

getNamesButton.addEventListener("click", () => {
  result.innerHTML = getComponentsName(jsonString);
});

function getCategories(json) {
  const categories = JSON.parse(json).data.items;
  let categoryArray = [];
  categories.forEach((item) => {
    categoryArray.push(item.label);
  });
  return categoryArray.join(",");
}

function getComponentsTag(json) {
  const components = JSON.parse(json).data.items;
  let tags = [];
  components.forEach((item) => {
    tags.push(item.name);
  });
  return tags.join(",");
}

function getComponentsName(json) {
  const components = JSON.parse(json).data.items;
  let tags = [];
  components.forEach((item) => {
    tags.push(item.label);
  });
  return tags.join(",");
}
