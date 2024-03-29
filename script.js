// Disable text wrapping
var text = document.getElementById("t");
text.wrap = "off";

// Initialize SVG and dimension variables
var svg = null;
var width = document.getElementById("w");
var height = document.getElementById("h");

// Add event listener for rendering SVG content
document.getElementById("l").addEventListener("click", function () {
  var div = document.getElementById("d");
  div.innerHTML = text.value;
  svg = div.querySelector("svg");
  width.value = svg.getBoundingClientRect().width;
  height.value = svg.getBoundingClientRect().height;
});

// Add event listener for saving rendered SVG as PNG
document.getElementById("s").addEventListener("click", function () {
  var canvas = document.getElementById("c");

  // Update SVG dimensions
  svg.setAttribute("width", width.value);
  svg.setAttribute("height", height.value);
  canvas.width = width.value;
  canvas.height = height.value;

  // Serialize SVG to XML format
  var data = new XMLSerializer().serializeToString(svg);

  // Create image blob and URL
  var win = window.URL || window.webkitURL || window;
  var img = new Image();
  var blob = new Blob([data], { type: "image/svg+xml" });
  var url = win.createObjectURL(blob);

  // Render image on canvas and prepare for download
  img.onload = function () {
    canvas.getContext("2d").drawImage(img, 0, 0);
    win.revokeObjectURL(url);
    var uri = canvas
      .toDataURL("image/png")
      .replace("image/png", "octet/stream");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = uri;
    a.download =
      (svg.id ||
        svg.getAttribute("name") ||
        svg.getAttribute("aria-label") ||
        "untitled") + ".png";
    a.click();
    window.URL.revokeObjectURL(uri);
    document.body.removeChild(a);
  };
  img.src = url;
});
