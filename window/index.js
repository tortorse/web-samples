const button = document.getElementById("btn");
button.addEventListener("click", () => {
  window.open(
    "window.html",
    "newWindow",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=w, height=h, top=top, left=left"
  );
});
