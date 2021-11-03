/*
 * @Date: 2021-11-02 16:49:52
 * @LastEditors: tortorse
 * @LastEditTime: 2021-11-03 12:51:03
 * @FilePath: \web-samples\ast\index.js
 */
const codeToAst = (code) => {
  if (code) {
    return esprima.parse(code, {
      sourceType: "module",
      comment: true,
      range: true,
      tokens: true,
    });
  }
};

const sampleCode = `
export default {
  // common
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  edit: '编辑',
  add: '添加',
  search: '搜索',
  reset: '重置',
  // import and export
  export: '导出',
  import: '导入',
  importSuccess: '导入成功',
  importFail: '导入失败',
  exportSuccess: '导出成功',
  exportFail: '导出失败',
  exportAll: '导出全部',
  exportSelected: '导出选中',
  exportAllSuccess: '导出全部成功',
  exportAllFail: '导出全部失败',
  exportSelectedSuccess: '导出选中成功',
  exportSelectedFail: '导出选中失败',
  exportAllConfirm: '确认导出全部',
  exportSelectedConfirm: '确认导出选中',
  exportAllSuccessConfirm: '确认导出全部成功',
  exportAllFailConfirm: '确认导出全部失败',
  exportSelectedSuccessConfirm: '确认导出选中成功',
  exportSelectedFailConfirm: '确认导出选中失败',
  exportAllCancel: '取消导出全部',
}
`;

const ast = codeToAst(sampleCode);

const pickKeyValueMap = (ast) => {
  const map = [];
  const { body } = ast;
  body.forEach((node) => {
    if (node.type === "ExportDefaultDeclaration") {
      const { declaration } = node;
      if (declaration.type === "ObjectExpression") {
        const { properties } = declaration;
        properties.forEach((property) => {
          if (property.type === "Property") {
            const { key,value } = property;
            if (key.type === "Identifier") {
              map.push({
                name: key.name,
                value: value.value,
              });
            }
          }
        });
      }
    }
  });
  return map;
}
const localeMap = pickKeyValueMap(ast);

const localesWrapper = document.querySelector("#locales");
const table = document.createElement("table");
localeMap.forEach(locale => {
  const tr = document.createElement("tr");
  const name = document.createElement("td");
  const value = document.createElement("td");
  
  name.textContent = locale.name;
  value.textContent = locale.value;
  
  tr.appendChild(name);
  tr.appendChild(value);
  table.appendChild(tr);
});
localesWrapper.appendChild(table);