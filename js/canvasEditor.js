/**
 * Canvas Editor
 * Helper for canvas edition
 * @param {Object} renderZoneId - HTML element where the canvas need to be rendered
 * @param {String} canvasName - Name of the layer
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {Number} zIndex - z-index of the canvas
 */
class CanvasEditor {
  constructor(renderZoneId, canvasName, canvasWidth, canvasHeight, zIndex) {
    this.renderZoneId = renderZoneId
    this.canvasName = canvasName
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.zIndex = zIndex
    this.canvasElement
    this.canvasCtx

    this.text = {}

    // Generate the canvas
    this.createCanvas(this.renderZoneId, this.canvasName, this.canvasWidth, this.canvasHeight, this.zIndex)
  }

  get canvasCtxUrl() {
    return this.canvasElement.toDataURL('image/png')
  }

  /**
   * Create canvas
   * @param {string} canvasName - Name of the canvas that will be created
   */
  createCanvas(renderZoneId, canvasName, canvasWidth, canvasHeight, zIndex) {
    let canvas = document.createElement('canvas')
    canvas.setAttribute('width', canvasWidth)
    canvas.setAttribute('height', canvasHeight)
    canvas.setAttribute('id', canvasName)
    canvas.setAttribute('class', 'max-w-full py-4 absolute top-0 left-0')
    canvas.setAttribute('style', `z-index: ${zIndex}`)

    // Create canvas element in HTML
    renderZoneId.append(canvas)
    console.log(`Canvas ${canvasName} created!`)

    this.canvasElement = document.getElementById(canvasName)
    this.canvasCtx = this.canvasElement.getContext('2d')
  }

  /**
   * Clear the canvas
   */
  clearCanvas() {
    this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  /**
   * Update text on the canvas
   * @param {Object} textParameters - Text parameters
   * @param {Number} textParameters.posX - Position in X
   * @param {Number} textParameters.posY - Position in Y
   * @param {String} textParameters.text - Text to write
   * @param {String} [textParameters.color] - Text color
   * @param {String} [textParameters.font] - Text font
   * @param {Number} [textParameters.size] - Text size
   */
  writeText(textParameters) {
    this.text = {
      posX: textParameters.posX,
      posY: textParameters.posY,
      value: textParameters.text,
      color: textParameters.color ? textParameters.color : '#000000',
      font: textParameters.font ? textParameters.font : 'sans-serif',
      size: textParameters.size ? textParameters.size : 48,
    }

    this.updateText({})
  }

  /**
   * Update text on the canvas
   * @param {Object} updatedText - Text parameters
   * @param {Number} [updatedText.posX] - Position in X
   * @param {Number} [updatedText.posY] - Position in Y
   * @param {String} [updatedText.text] - Text to write
   * @param {String} [updatedText.color] - Text color
   * @param {String} [updatedText.font] - Text font
   * @param {Number} [updatedText.size] - Text size
   */
  updateText(updatedText) {
    this.text = {
      posX: updatedText.posX ? updatedText.posX : this.text.posX,
      posY: updatedText.posY ? updatedText.posY : this.text.posY,
      value: updatedText.text ? updatedText.text : this.text.value,
      color: updatedText.color ? updatedText.color : this.text.color,
      font: updatedText.font ? updatedText.font : this.text.font,
      size: updatedText.size ? updatedText.size : this.text.size,
    }

    this.clearCanvas()

    this.canvasCtx.fillStyle = this.text.color
    this.canvasCtx.font = `${this.text.size}px ${this.text.font}`
    this.canvasCtx.lineHeight = `${this.text.size}px`
    this.canvasCtx.textBaseline = 'hanging'

    this.canvasCtx.fillText(this.text.value, this.text.posX, this.text.posY)
  }

  /**
   * Update background
   * @param {String} color - Background color
   */
  updateBackgroud(color) {
    this.backgroundColor = color

    this.canvasCtx.fillStyle = this.backgroundColor
    this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  }
}
