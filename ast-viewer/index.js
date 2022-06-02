const codeInput = document.querySelector("#code");

const astPreview = document.querySelector("#ast");

const button = document.querySelector("#generate");

button.addEventListener("click", () => {
  const codeString = codeInput.value;
  if (codeString) {
    const ast = esprima.parse(codeString);
    astPreview.innerHTML = jsonViewer(ast);
  }
});

function jsonViewer(json, collapsible = false) {
  const TEMPLATES = {
    item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
    itemCollapsible:
      '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
    itemCollapsibleOpen:
      '<label class="json__item json__item--collapsible"><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
  };

  function createItem(key, value, type) {
    let element = TEMPLATES.item.replace("%KEY%", key);

    if (type == "string") {
      element = element.replace("%VALUE%", '"' + value + '"');
    } else {
      element = element.replace("%VALUE%", value);
    }

    element = element.replace("%TYPE%", type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    const tpl = "itemCollapsible";

    if (collapsible) {
      tpl = "itemCollapsibleOpen";
    }

    let element = TEMPLATES[tpl].replace("%KEY%", key);

    element = element.replace("%VALUE%", type);
    element = element.replace("%TYPE%", type);
    element = element.replace("%CHILDREN%", children);

    return element;
  }

  function handleChildren(key, value, type) {
    let html = "";

    for (const item in value) {
      const _key = item,
        _val = value[item];

      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    const type = typeof value;

    if (typeof value === "object") {
      return handleChildren(key, value, type);
    }

    return createItem(key, value, type);
  }

  function parseObject(obj) {
    _result = '<div class="json">';

    for (const item in obj) {
      const key = item,
        value = obj[item];

      _result += handleItem(key, value);
    }

    _result += "</div>";

    return _result;
  }

  return parseObject(json);
}
