function toggle() {
  let nav = document.getElementById("topnav");
  if (nav.className === "navbar") {
    nav.className += " responsive";
  } else {
    nav.className = "navbar";
  }
}