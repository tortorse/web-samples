const firstCategoryTitles = document.querySelectorAll(
  ".NavigationLevel--level-1>.NavigationLevel__parent .NavigationItem a"
);

const firstCategoryTitlesArray = [];
firstCategoryTitles.forEach((title) => {
  firstCategoryTitlesArray.push(title.innerHTML.trim());
});

console.log(firstCategoryTitlesArray.join(","));

const secondCategoryTitles = document.querySelectorAll(
  ".NavigationLevel--level-2>.NavigationLevel__parent .NavigationItem .NavigationItem__router-link"
);

const secondCategoryTitlesArray = [];
secondCategoryTitles.forEach((title) => {
  secondCategoryTitlesArray.push(title.innerHTML.trim());
});

// console.log(secondCategoryTitlesArray.join(","));

const thirdCategoryTitles = document.querySelectorAll(
  ".NavigationLevel--level-3>.NavigationLevel__parent .NavigationItem .NavigationItem__router-link"
);

const thirdCategoryTitlesArray = [];

thirdCategoryTitles.forEach((title) => {
  thirdCategoryTitlesArray.push(title.innerHTML.trim());
});

console.log(thirdCategoryTitlesArray.join(","));

const methodsTitles = document.querySelectorAll(
  ".NavigationLevel__children .NavigationItem .NavigationItem__router-link"
);

const methodsArray = [];
methodsTitles.forEach((title) => {
  methodsArray.push(title.innerHTML.trim());
});

_.pullAll(methodsArray, firstCategoryTitlesArray);
_.pullAll(methodsArray, secondCategoryTitlesArray);
_.pullAll(methodsArray, thirdCategoryTitlesArray);
// console.log(methodsArray.join(","));
