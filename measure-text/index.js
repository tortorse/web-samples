const span = document.querySelector(".span");
const spanTextNode = span.childNodes[0];
const textRange = document.createRange();
textRange.selectNode(spanTextNode);
const spanTextRect = textRange.getBoundingClientRect();
textRange.detach();

const div = document.querySelector(".div");
const divTextNode = div.childNodes[0];
textRange.selectNode(divTextNode);
const divTextRect = textRange.getBoundingClientRect();
textRange.detach();

const results = document.querySelectorAll(".result");
results.forEach((result, index) => {
  result.innerHTML = `
  width: ${index === 0 ? spanTextRect.width : divTextRect.width}, <br />
  height: ${index === 0 ? spanTextRect.height : divTextRect.height} 
  `;
});
