function toggle() {
  const nav = document.getElementById('topnav');
  if (nav.className === 'navbar') {
    nav.className += ' responsive';
  } else {
    nav.className = 'navbar';
  }
}
