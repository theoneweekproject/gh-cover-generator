console.log('GitHub cover generator v0.0.3')
console.log('Contribute at: https://github.com/theoneweekproject/gh-cover-generator')

// ==================== Global variables ====================
// ---------- Canvas content data ----------
let canvasContent = {
  line1: 'Hi 👋,',
  line2: "I'm Lucas ALBERT",
  line3: 'CAD Designer / Web Developer / Maker / Love to play video game',
}

// ---------- Inputs ----------
const line1Input = document.getElementById('line1')
const line2Input = document.getElementById('line2')
const line3Input = document.getElementById('line3')

// ---------- Preview ----------
const previewArea = document.getElementById('preview')

// ---------- Layers ----------
const backgroundLayer = new CanvasEditor(previewArea, 'backgroundLayer', 1000)
const line1Layer = new CanvasEditor(previewArea, 'line1Layer', 1001)
const line2Layer = new CanvasEditor(previewArea, 'line2Layer', 1002)
const line3Layer = new CanvasEditor(previewArea, 'line3Layer', 1003)

// ==================== Page initialization ====================
function updateInputs() {
  line1Input.value = canvasContent.line1
  line2Input.value = canvasContent.line2
  line3Input.value = canvasContent.line3
}
function init() {
  updateInputs()
}

window.onload = init()
