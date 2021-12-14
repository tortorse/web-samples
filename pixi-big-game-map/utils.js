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

function mockCells(id, column, row, startX, startY) {
  let data = [];
  let color = "2ac161";
  let y = startY;
  for (let j = 0; j < row; j++) {
    for (let i = 0; i < column; i++) {
      id += 1;
      data.push({
        id,
        size: 1,
        position: {
          x: startX + i,
          y,
        },
        content: {
          color,
        },
      });
    }
    y += 1;
  }

  return JSON.stringify(data);
}

const r1 = mockCells(0, 360, 24, 0, 0);
const r2 = mockCells(8640, 384, 24, 0, 24);
const r3 = mockCells(17856, 129, 48, 60, 48);
const r4 = mockCells(24048, 120, 29, 216, 48);
const r5 = mockCells(27528, 66, 46, 294, 77);
const r6 = mockCells(30564, 48, 108, 144, 96);
const r7 = mockCells(37800, 54, 63, 192, 141);
const r8 = mockCells(35748, 24, 72, 120, 126);
const r9 = mockCells(37476, 18, 18, 192, 123);
const r10 = mockCells(41202, 24, 12, 192, 204);
const r11 = mockCells(41490, 99, 24, 0, 198);
const r12 = mockCells(43866, 90, 150, 0, 222);
const r13 = mockCells(57366, 24, 12, 0, 372);
const r14 = mockCells(57654, 81, 149, 90, 259);
const r15 = mockCells(69723, 56, 87, 309, 1230);
const r16 = mockCells(74595, 102, 102, 306, 210);
const r17 = mockCells(84999, 83, 66, 223, 276);
const r18 = mockCells(90477, 156, 18, 228, 342);
const r19 = mockCells(93285, 75, 30, 306, 312);
const r19 = mockCells(93285, 75, 30, 306, 312);
