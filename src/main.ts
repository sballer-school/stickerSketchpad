import "./style.css";

document.body.innerHTML = `
  <h1>App Title</h1>
`;

const canvas = document.createElement("canvas");
canvas.width = 256;
canvas.height = 256;
document.body.append(canvas);

/*const clearCanvas = document.createElement("button");
clearCanvas.textContent = "Clear";
clearCanvas.id="clear"
clearCanvas.addEventListener("click", () => {
  console.log("Clear");
});
document.body.appendChild(clearCanvas);*/

const ctx = canvas.getContext("2d");

const cursor = { active: false, x: 0, y: 0 };

canvas.addEventListener("mousedown", (e) => {
  cursor.active = true;
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (cursor.active && ctx != null) {
    ctx.beginPath();
    ctx.moveTo(cursor.x, cursor.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  cursor.active = false;
});

const clearButton = document.createElement("button");
clearButton.innerHTML = "clear";
document.body.append(clearButton);

clearButton.addEventListener("click", () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});
