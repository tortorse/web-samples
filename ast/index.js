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
                key: key.name,
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
console.log(ast);
const dict = pickKeyValueMap(ast);
console.log(dict);