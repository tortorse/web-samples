function mockArea() {
  const originX = 156;
  let x = 156;
  const areaId = 1189;
  let id = 1189;
  let size = 12;
  let row = [];
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (x === size - 1) {
        x = originX;
      }
      id += 1;
      row.push({
        id,
        position: { x: originX + i, y: j },
        locatedIn: areaId,
      });
    }
  }
}

function mockCells() {
  let row = [];
  let id = 1633;
  let count = 12;
  let startX = 125;
  let color = "2ac161";
  let y = 2;
  for (let i = 0; i < count; i++) {
    id += 1;
    row.push({
      id,
      size: 1,
      position: {
        x: startX + 1 + i,
        y,
      },
      content: {
        color,
      },
    });
  }
}
