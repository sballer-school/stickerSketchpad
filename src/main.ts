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

const lines: { x: number; y: number }[][] = [];
const redoLines: { x: number; y: number }[] = [];

let currentLine: { x: number; y: number }[] | null = null;

const cursor = { active: false, x: 0, y: 0 };

canvas.addEventListener("mousedown", (e) => {
  cursor.active = true;
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;

  currentLine = [];
  lines.push(currentLine);
  redoLines.splice(0, redoLines.length);
  currentLine.push({ x: cursor.x, y: cursor.y });
  canvas.dispatchEvent(changedEvent);
});

canvas.addEventListener("mousemove", (e) => {
  if (cursor.active && currentLine != null) {
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
    currentLine.push({ x: cursor.x, y: cursor.y });
    canvas.dispatchEvent(changedEvent);
  }
});

canvas.addEventListener("mouseup", () => {
  cursor.active = false;
  currentLine = null;
});

const changedEvent = new CustomEvent("build");

canvas.addEventListener("build", () => {
  redraw();
});

function redraw() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const line of lines) {
      if (line.length > 1) {
        ctx.beginPath();
        const { x, y } = line[0];
        ctx.moveTo(x, y);
        for (const { x, y } of line) {
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  }
}

document.body.append(document.createElement("br"));

const clearButton = document.createElement("button");
clearButton.innerHTML = "Clear";
document.body.append(clearButton);

clearButton.addEventListener("click", () => {
  lines.splice(0, lines.length);
  canvas.dispatchEvent(changedEvent);
});
