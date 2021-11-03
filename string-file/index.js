/*
 * @Date: 2021-11-03 09:21:12
 * @LastEditors: tortorse
 * @LastEditTime: 2021-11-03 12:38:43
 * @FilePath: \web-samples\string-file\index.js
 */
const localeFileContent = `/* Localized versions of Info.plist keys */

"Hello"="你好";
"Hi"="嗨";
"new_friend"="新的朋友";
"forget_password"="忘记密码";
"login"="登录";
"regist"="注册";
`;

const parse = (input, wantsComments) => {
  // splt into lines
  const lines = input.split("\n");
  // previous comment
  let currentComment = "";
  let currentValue = "";
  let nextLineIsValue = false;
  let nextLineIsComment = false;
  // patterns used for parsing
  let reAssign = /[^\\]" = "/;
  let reLineEnd = /";$/;
  let reCommentEnd = /\*\/$/;
  let result = [];
  // process line by line
  lines.forEach((line) => {
    let msgid, msgstr, val;
    // strip extra whitespace
    line = line.trim();
    // normalize spacing around assignment operator
    line = line.replace(/([^\\])("\s*=\s*")/g, '$1" = "');
    // remove any space between final quote and semi-colon
    line = line.replace(/"\s+;/g, '";');
    // check if strarts with '/*', store it in currentComment variable
    if (nextLineIsComment) {
      if (line.search(reCommentEnd) !== -1) {
        currentComment += "\n" + line.trim();
        return;
      } else {
        nextLineIsComment = false;
        currentComment +=
          "\n" + line.substring(0, line.search(reCommentEnd)).trim();
        return;
      }
    } else if (line.substring(0, 2) === "//") {
      currentComment = line.substring(2).trim();
      return;
    } else if (line.substring(0, 2) === "/*" && !nextLineIsValue) {
      if (line.search(reCommentEnd) === -1) {
        nextLineIsComment = true;
        currentComment = line.substring(2).trim();
        return;
      } else {
        nextLineIsComment = false;
        currentComment = line
          .substring(2, line.search(reCommentEnd) - 2)
          .trim();
        return;
      }
    }
    msgid = "";
    msgstr = "";
    if (line === "" && !nextLineIsValue) {
      return;
    }
    // check if starts width '/*', store it in currentComment variable
    if (nextLineIsValue) {
      if (line.search(reLineEnd) !== -1) {
        currentValue += "\n" + line.trim();
        return;
      } else {
        nextLineIsValue = false;
        currentValue += "\n" + line.substring(0, line.search(reLineEnd)).trim();
        msgid = currentId;
        msgstr = currentValue;
        currentId = "";
        currentValue = "";
      }
    } else if (line.search(reLineEnd) === -1 && !nextLineIsComment) {
      nextLineIsValue = true;
      currentId = line;
      currentId = currentId.substring(1);
      currentId = currentId.substring(0, currentId.search(reAssign) + 1);
      currentId = currentId.replace(/\\"/g, '"');
      currentValue = line;
      currentValue = currentValue.substring(currentValue.search(reAssign) + 6);
      return;
    } else {
      // get msgid
      msgid = line;
      msgid = msgid.substring(1);
      msgid = msgid.substring(0, msgid.search(reAssign) + 1);
      // get msgstr
      msgstr = line;
      msgstr = msgstr.substring(msgstr.search(reAssign) + 6);
      msgstr = msgstr.substring(0, msgstr.search(reLineEnd));
      // convert escaped quotes
      msgid = msgid.replace(/\\"/g, '"');
    }
    msgstr = msgstr.replace(/\\"/g, '"');
    // convert escaped new lines
    msgid = msgid.replace(/\\n/g, "\n");
    msgstr = msgstr.replace(/\\n/g, "\n");
    if (!wantsComments) {
      let map = {
        name: msgid,
        value: msgstr,
      };
      result.push(map);
    } else {
      let map = {
        name: msgid,
        value: msgstr,
      };
      if (currentComment) {
        map["comment"] = currentComment;
        currentComment = "";
      }
      result.push(map);
    }
  });
  return result;
};

const localeMap = parse(localeFileContent, true);

const localesWrapper = document.querySelector("#locales");
const table = document.createElement("table");
localeMap.forEach((locale) => {
  const tr = document.createElement("tr");
  const comment = document.createElement("td");
  const name = document.createElement("td");
  const value = document.createElement("td");
  comment.textContent = `${locale.comment ? "/* " + locale.comment + " */" : ""}`;
  name.textContent = locale.name;
  value.textContent = locale.value;
  tr.appendChild(comment);
  tr.appendChild(name);
  tr.appendChild(value);
  table.appendChild(tr);
});
localesWrapper.appendChild(table);
