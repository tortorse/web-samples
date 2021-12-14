const xyChecker = document.querySelector("#xy");
const tvChecker = document.querySelector("#tv");
const dataSizeInput = document.querySelector("#size");
const xyContainer = document.querySelector("#xy-container");
const tvContainer = document.querySelector("#tv-container");
const xAxisStartInput = document.querySelector("#x-start");
const yAxisMaxInput = document.querySelector("#y-max");
const yAxisMinInput = document.querySelector("#y-min");
const seriesCountInput = document.querySelector("#series-count");
const seriesInputContainer = document.querySelector(".series");
const generateButtonXY = document.querySelector("#generate-xy");
const jsonOutput = document.querySelector("#json");
const timeIntervalInput = document.querySelector("#interval");
const xFormatInput = document.querySelector("#xFormat");

const partitionCountInput = document.querySelector("#partition");
const kvContainer = document.querySelector("#kv-container");
const generateButtonKV = document.querySelector("#generate-tv");

let dataSize = dataSizeInput.value;
let xAxisStart = dayjs().format("YYYY-MM-DDTHH:mm:ss");
let timeInterval = timeIntervalInput.value;
let xFormat = xFormatInput.value;
let yAxisMax = yAxisMaxInput.value;
let yAxisMin = yAxisMinInput.value;
let seriesInputs = [];
let seriesCount = seriesCountInput.value;

let kvInputs = [];
xAxisStartInput.value = xAxisStart;

xyChecker.addEventListener("change", (e) => {
  xyContainer.style.display = "block";
  tvContainer.style.display = "none";
});

tvChecker.addEventListener("change", (e) => {
  xyContainer.style.display = "none";
  tvContainer.style.display = "block";
});

dataSizeInput.addEventListener("change", (e) => {
  const { value } = e.target;
  dataSize = value;
});

seriesCountInput.addEventListener("change", (e) => {
  const { value } = e.target;
  seriesCount = value;
  createSeriesInput(value);
});

timeIntervalInput.addEventListener("change", () => {
  const { value } = e.target;
  timeInterval = value;
});

xFormatInput.addEventListener("change", (e) => {
  const { value } = e.target;
  xFormat = value;
});

generateButtonXY.addEventListener("click", () => {
  generate("xy");
});

xAxisStartInput.addEventListener("change", (e) => {
  const { value } = e.target;
  xAxisStart = value;
});

yAxisMaxInput.addEventListener("change", (e) => {
  const { value } = e.target;
  yAxisMax = value;
});

yAxisMinInput.addEventListener("change", (e) => {
  const { value } = e.target;
  yAxisMin = value;
});

partitionCountInput.addEventListener("change", (e) => {
  createKvInputs(partitionCountInput.value);
});

generateButtonKV.addEventListener("click", () => {
  generate("tv");
});
const createSeriesInput = (count) => {
  seriesInputContainer.innerHTML = "";
  seriesInputs = [];
  for (i = 0; i < count; i++) {
    const seriesInput = document.createElement("input");
    seriesInputs.push(seriesInput);
    seriesInputContainer.appendChild(seriesInput);
  }
};

let chartData = [];
const generate = (type) => {
  chartData = [];
  if (type === "xy") {
    if (seriesCount == 0) {
      for (i = 0; i < dataSize; i++) {
        chartData.push({
          x: dayjs(
            dayjs(xAxisStart).valueOf() + timeInterval * 1000 * i
          ).format(xFormat),
          y: getRandomIntInclusive(yAxisMin, yAxisMax),
        });
      }
    } else {
      for (let s = 0; s < seriesCount; s++) {
        let seriesName = seriesInputs[s].value;
        for (i = 0; i < dataSize; i++) {
          chartData.push({
            x: dayjs(
              dayjs(xAxisStart).valueOf() + timeInterval * 1000 * i
            ).format(xFormat),
            y: getRandomIntInclusive(yAxisMin, yAxisMax),
            series: seriesName,
          });
        }
      }
    }
  }

  if (type === "tv") {
    for (i = 0; i < partitionCountInput.value; i++) {
      chartData.push({
        type: kvInputs[i].querySelectorAll("input")[0].value,
        value: Number(kvInputs[i].querySelectorAll("input")[1].value),
      });
    }
  }

  jsonOutput.innerHTML = JSON.stringify(chartData, null, 2);
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createKvInputs = (count) => {
  kvContainer.innerHTML = "";
  kvInputs = [];
  for (i = 0; i < count; i++) {
    const row = document.createElement("div");
    const keyInput = document.createElement("input");
    keyInput.value = getRadomString();
    const valueInput = document.createElement("input");
    valueInput.value = getRandomIntInclusive(0, 100);
    row.appendChild(keyInput);
    row.appendChild(valueInput);
    kvContainer.appendChild(row);
    kvInputs.push(row);
  }
};

const getRadomString = () => {
  return Math.random().toString(36).substr(2, 5);
};

createKvInputs(partitionCountInput.value);
