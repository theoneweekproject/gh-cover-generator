/**
 * Canvas Editor
 * Helper for canvas edition
 * @param {Object} previewArea - HTML element where the canvas need to be rendered
 * @param {String} canvasName - Name of the layer
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {Number} zIndex - z-index of the canvas
 */
class CanvasEditor {
  constructor(previewArea, canvasName, canvasWidth, canvasHeight, zIndex) {
    this.previewArea = previewArea
    this.canvasName = canvasName
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.zIndex = zIndex
    this.canvasCtx

    // Generate the canvas
    this.createCanvas(this.previewArea, this.canvasName, this.canvasWidth, this.canvasHeight, this.zIndex)
  }

  /**
   * Create canvas
   * @param {string} canvasName - Name of the canvas that will be created
   */
  createCanvas(previewArea, canvasName, canvasWidth, canvasHeight, zIndex) {
    let canvas = document.createElement('canvas')
    canvas.setAttribute('width', canvasWidth)
    canvas.setAttribute('height', canvasHeight)
    canvas.setAttribute('id', canvasName)
    canvas.setAttribute('class', 'max-w-full py-4 absolute top-0 left-0')
    canvas.setAttribute('style', `z-index: ${zIndex}`)

    previewArea.append(canvas)
    let canvasElement = document.getElementById(canvasName)
    this.canvasCtx = canvasElement.getContext('2d')
  }

  /**
   * Clear the canvas
   */
  clearCanvas() {
    this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  /**
   * Write text on the canvas
   * @param {String} text - Text to write
   * @param {Number} xPos - Position in X
   * @param {Number} yPos - Position in Y
   */
  writeText(text, xPos, yPos) {
    let fontSize = 48
    let posX = xPos
    let posY = yPos

    this.canvasCtx.font = `${fontSize}px sans-serif`
    this.canvasCtx.lineHeight = `${fontSize}px`
    this.canvasCtx.textBaseline = 'hanging'

    this.canvasCtx.fillText(text, posX, posY)
  }

  /**
   * Update text on the canvas
   * @param {String} text - Text to write
   * @param {Number} xPos - Position in X
   * @param {Number} yPos - Position in Y
   */
  updateText(text, xPos, yPos) {
    this.clearCanvas()
    this.writeText(text, xPos, yPos)
  }
}
