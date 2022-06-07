const rows = document.querySelectorAll("table tbody tr");

const devices = [];

rows.forEach((row) => {
  const columns = row.querySelectorAll("tbody tr td");
  const name = columns[0].innerText;
  const os = columns[1].innerText;
  const w = columns[2].innerText;
  const h = columns[3].innerText;
  if (os === "iOS") {
    devices.push({
      name,
      os,
      w,
      h,
    });
  }
});

console.log(devices);
