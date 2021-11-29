const originX = 48
let id = 326
let x = 48
let y
let areaId = 326
let size = 12
let row = []
for (let j = 0; j < size; j++) {
  for (let i = 0; i < size; i++) {
    if (x === size - 1) {
      x = originX
    }
    id += 1;
    row.push({
      id,
      position: { x: originX + i, y: j },
      locatedIn: areaId
    });
  }
}


