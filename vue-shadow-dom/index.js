const SearchBox = Vue.component("search-box", {
  render(h) {
    return h("div", {}, [
      h("i", {}, "🔍"),
      h("input", {}),
      "search",
    ]);
  },
});

const app = new Vue({
  el: "#app",
  components: [SearchBox],
});

const SearchBoxComponent = wrapVueWebComponent(Vue, SearchBox);

window.customElements.define("search-box", SearchBoxComponent);
