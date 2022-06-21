class SearchBox extends HTMLElement {
  constructor() {
    super();
    const box = document.createElement("div");
    const searchIcon = document.createElement("i");
    const searchInput = document.createElement("input");
    searchIcon.innerText = "🔍";
    box.appendChild(searchIcon);
    box.appendChild(searchInput);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(box);
  }
}
customElements.define("search-box", SearchBox);
