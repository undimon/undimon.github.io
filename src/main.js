function toggleMenu() {
  var x = document.getElementById("menu-links");
  if (x.className === "menu-links show") {
    x.style.display = "none";
    x.className = "menu-links";
  } else {
  	 x.style.display = "block";
     x.className = "menu-links show";
  }
}