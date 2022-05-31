const debug = document.querySelector(".debug");
const constraints = {
  audio: true,
  video: true,
};
async function getUserMedia() {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia();
    alert(stream);
  } catch (e) {
    alert(e);
  }
}

async function enumerateDevices() {
  let devices = [];
  try {
    devices = await navigator.mediaDevices.enumerateDevices();
    debug.innerHTML = JSON.stringify(devices);
  } catch (e) {
    alert(e);
  }
}

function getPermissions() {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state == "granted") {
    } else if (result.state == "prompt") {
      navigator.geolocation.getCurrentPosition(
        revealPosition,
        positionDenied,
        geoSettings
      );
    } else if (result.state == "denied") {
    }
    result.addEventListener("change", () => {
      console.log(result.state);
    });
  });
}
function revealPosition() {}
function positionDenied() {}
function geoSettings() {}
getPermissions();
