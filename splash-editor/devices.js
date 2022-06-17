const rows = document.querySelectorAll("table tbody tr");

const devices = [];

rows.forEach((row) => {
  const columns = row.querySelectorAll("tbody tr td");
  const name = columns[0].innerText;
  const lw = columns[1].innerText;
  const lh = columns[2].innerText;
  const pw = columns[3].innerText;
  const ph = columns[4].innerText;
  const scale = columns[6].innerText;
  if (name.includes("iPhone")) {
    devices.push({
      name,
      lw,
      lh,
      pw,
      ph,
      scale,
    });
  }
});

const result = _.uniqWith(devices, (a, b) => {
  return a.lw === b.lw && a.lh === b.lh;
});

console.log(JSON.stringify(result));
