console.log('GitHub cover generator v0.0.4')
console.log('Contribute at: https://github.com/theoneweekproject/gh-cover-generator')

// ==================== Global variables ====================
// ---------- Canvas content data ----------
let canvasContent = {
  line1: 'Hi 👋,',
  line2: "I'm Lucas ALBERT",
  line3: 'CAD Designer / Web Developer / Maker',
  fontColor: '#4C1D95',
  fontFamily: 'sans-serif',
  backgroundColor: '#EDE9FE',
}

// ---------- Inputs ----------
const line1Input = document.getElementById('line1')
const line2Input = document.getElementById('line2')
const line3Input = document.getElementById('line3')
const fontColorInput = document.getElementById('fontColor')
const fontSizeInput = document.getElementById('fontSize')
const fontFamilyInput = document.getElementById('fontFamily')
const backgroundColorInput = document.getElementById('backgroundColor')
const generateExportButton = document.getElementById('generateExport')

// ---------- Preview ----------
const previewArea = document.getElementById('preview')
const outputArea = document.getElementById('output')

// ---------- Layers ----------
const backgroundLayer = new CanvasEditor(previewArea, 'backgroundLayer', 1280, 500, 1000)
const line1Layer = new CanvasEditor(previewArea, 'line1Layer', 1280, 500, 1001)
const line2Layer = new CanvasEditor(previewArea, 'line2Layer', 1280, 500, 1002)
const line3Layer = new CanvasEditor(previewArea, 'line3Layer', 1280, 500, 1003)
const exportLayer = new CanvasEditor(outputArea, 'exportLayer', 1280, 500, 1000)

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

// ---------- Font size input ----------
fontSizeInput.addEventListener('change', async () => {
  const sizes = [32, 48, 52, 56, 64]

  line1Layer.updateText({ size: sizes[fontSizeInput.selectedIndex] })
  line2Layer.updateText({ size: sizes[fontSizeInput.selectedIndex] })
  line3Layer.updateText({ size: sizes[fontSizeInput.selectedIndex] })
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

// ---------- Background color input ----------
backgroundColorInput.addEventListener('change', (e) => {
  backgroundLayer.updateBackgroud(e.target.value)
})

// ---------- Generate export button input ----------
generateExportButton.addEventListener('click', (e) => {
  createExport()
  setTimeout(() => {
    exportToImage()
  }, 100)
})

// ==================== Canvas export ====================
function createExport() {
  let canvas = document.createElement('canvas')
  canvas.setAttribute('width', 1280)
  canvas.setAttribute('height', 500)
  canvas.setAttribute('class', 'max-w-full py-4')

  // Create canvas element in HTML
  outputArea.append(canvas)

  // Export background
  const backgroundImage = new Image()
  backgroundImage.src = backgroundLayer.canvasCtxUrl
  backgroundImage.onload = function () {
    exportLayer.canvasCtx.drawImage(backgroundImage, 0, 0)
  }

  // Export line 1
  const line1Image = new Image()
  line1Image.src = line1Layer.canvasCtxUrl
  line1Image.onload = function () {
    exportLayer.canvasCtx.drawImage(line1Image, 0, 0)
  }

  // Export line 2
  const line2Image = new Image()
  line2Image.src = line2Layer.canvasCtxUrl
  line2Image.onload = function () {
    exportLayer.canvasCtx.drawImage(line2Image, 0, 0)
  }

  // Export line 3
  const line3Image = new Image()
  line3Image.src = line3Layer.canvasCtxUrl
  line3Image.onload = function () {
    exportLayer.canvasCtx.drawImage(line3Image, 0, 0)
  }
}

function exportToImage() {
  const exportLayerImg = new Image()
  exportLayerImg.src = exportLayer.canvasCtxUrl

  downloadExport('gh-header.png', exportLayerImg.src)
}

function downloadExport(filename, data) {
  var element = document.createElement('a')
  element.setAttribute('href', data)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
// ==================== Page initialization ====================
function updateInputs() {
  line1Input.value = canvasContent.line1
  line2Input.value = canvasContent.line2
  line3Input.value = canvasContent.line3
  fontColorInput.value = canvasContent.fontColor
  backgroundColorInput.value = canvasContent.backgroundColor
}

function init() {
  updateInputs()
  let canvasHeight = 500
  let fontSize = 48
  let spaceAround = (500 - 3 * fontSize - 2 * (100 - fontSize)) / 2
  //
  line1Layer.writeText({
    posX: 50,
    posY: spaceAround,
    text: canvasContent.line1,
    color: canvasContent.fontColor,
    size: fontSize,
  })
  line2Layer.writeText({
    posX: 50,
    posY: spaceAround + 2 * 50,
    text: canvasContent.line2,
    color: canvasContent.fontColor,
    size: fontSize,
  })
  line3Layer.writeText({
    posX: 50,
    posY: spaceAround + 4 * 50,
    text: canvasContent.line3,
    color: canvasContent.fontColor,
    size: fontSize,
  })
  backgroundLayer.updateBackgroud(canvasContent.backgroundColor)
}

window.onload = init()
