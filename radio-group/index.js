const huey = document.querySelector("#huey");
huey.addEventListener("change", (e) => {
  e.preventDefault();
  getValue(e);
});

const dewey = document.querySelector("#dewey");

dewey.addEventListener("change", (e) => {
  e.preventDefault();
  getValue(e);
});

const louie = document.querySelector("#louie");

louie.addEventListener("change", (e) => {
  e.preventDefault();
  getValue(e);
});

function getValue(e) {
  window.confirm(e.target.value);
}
