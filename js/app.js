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
const fontColorInput = document.getElementById('fontColor')
const fontFamilyInput = document.getElementById('fontFamily')

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
  line1Layer.updateText({ posX: 50, posY: 50, text: e.target.value })
})

// ---------- Line 2 input ----------
line2Input.addEventListener('input', (e) => {
  line2Layer.updateText({ posX: 50, posY: 150, text: e.target.value })
})

// ---------- Line 3 input ----------
line3Input.addEventListener('input', (e) => {
  line3Layer.updateText({ posX: 50, posY: 250, text: e.target.value })
})

// ---------- Font color input ----------
fontColorInput.addEventListener('change', (e) => {
  line1Layer.updateText({ color: e.target.value })
  line2Layer.updateText({ color: e.target.value })
  line3Layer.updateText({ color: e.target.value })
})

// ---------- Font family input ----------
fontFamilyInput.addEventListener('change', async () => {
  const fonts = ['sans-serif', 'serif', 'Roboto', 'Ubuntu', 'Poppins']
  let fontName = fonts[fontFamilyInput.selectedIndex]

  // Check if font is loaded
  let interval = null

  function checkFont() {
    let fontIsLoaded = document.fonts.check(`1em ${fontName}`)
    console.log(`${fontName} is loaded: ${fontIsLoaded}`)

    if (fontIsLoaded) {
      clearInterval(interval)
      line1Layer.updateText({ font: fontName })
      line2Layer.updateText({ font: fontName })
      line3Layer.updateText({ font: fontName })
    }
  }

  interval = setInterval(() => {
    console.log(`Checking for font ${fontName}...`)
    checkFont()
  }, 50)

  line1Layer.updateText({ font: fontName })
  line2Layer.updateText({ font: fontName })
  line3Layer.updateText({ font: fontName })
})

// ==================== Page initialization ====================
function updateInputs() {
  line1Input.value = canvasContent.line1
  line2Input.value = canvasContent.line2
  line3Input.value = canvasContent.line3
}

function init() {
  updateInputs()
  line1Layer.writeText({ posX: 50, posY: 50, text: canvasContent.line1 })
  line2Layer.writeText({ posX: 50, posY: 150, text: canvasContent.line2 })
  line3Layer.writeText({ posX: 50, posY: 250, text: canvasContent.line3 })
}

window.onload = init()
