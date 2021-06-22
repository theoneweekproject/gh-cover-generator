console.log('GitHub cover generator v0.0.4')
console.log('Contribute at: https://github.com/theoneweekproject/gh-cover-generator')

// ==================== Global variables ====================
// ---------- Canvas content data ----------
let canvasContent = {
  line1: 'Hi 👋,',
  line2: "I'm Lucas ALBERT",
  line3: 'CAD Designer / Web Developer / Maker',
}

// ---------- Inputs ----------
const line1Input = document.getElementById('line1')
const line2Input = document.getElementById('line2')
const line3Input = document.getElementById('line3')

// ---------- Preview ----------
const previewArea = document.getElementById('preview')

// ---------- Layers ----------
const backgroundLayer = new CanvasEditor(previewArea, 'backgroundLayer', 1280, 500, 1000)
const line1Layer = new CanvasEditor(previewArea, 'line1Layer', 1280, 500, 1001)
const line2Layer = new CanvasEditor(previewArea, 'line2Layer', 1280, 500, 1002)
const line3Layer = new CanvasEditor(previewArea, 'line3Layer', 1280, 500, 1003)

// ==================== Input handlers ====================
// ---------- Line 1 input ----------
line1Input.addEventListener('input', (e) => {
  line1Layer.updateText(e.target.value, 50, 50)
})

// ---------- Line 2 input ----------
line2Input.addEventListener('input', (e) => {
  line2Layer.updateText(e.target.value, 50, 150)
})

// ---------- Line 3 input ----------
line3Input.addEventListener('input', (e) => {
  line3Layer.updateText(e.target.value, 50, 250)
})

// ==================== Page initialization ====================
function updateInputs() {
  line1Input.value = canvasContent.line1
  line2Input.value = canvasContent.line2
  line3Input.value = canvasContent.line3
}

function init() {
  updateInputs()
  line1Layer.writeText(canvasContent.line1, 50, 50)
  line2Layer.writeText(canvasContent.line2, 50, 150)
  line3Layer.writeText(canvasContent.line3, 50, 250)
}

window.onload = init()
