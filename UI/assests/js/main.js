function toggle() {
  let nav = document.getElementById("topnav");
  if (nav.className === "navbar") {
    nav.className += " responsive";
  } else {
    nav.className = "navbar";
  }
}

let map;
function initMap() {
  map = new google.maps.Map(document.getElementByClassName('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}