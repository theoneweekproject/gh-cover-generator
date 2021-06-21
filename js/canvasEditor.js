/**
 * Canvas Editor
 * Helper for canvas edition
 * @param {Object} previewArea - HTML element where the canvas need to be rendered
 * @param {String} canvasName - Name of the layer
 * @param {Number} zIndex - z-index of the canvas
 */
class CanvasEditor {
  constructor(previewArea, canvasName, zIndex) {
    this.previewArea = previewArea
    this.canvasName = canvasName
    this.zIndex = zIndex
    this.canvasElement

    // Generate the canvas
    this.createCanvas(this.previewArea, this.canvasName, this.zIndex)
  }

  /**
   * Create canvas
   * @param {string} canvasName - Name of the canvas that will be created
   */
  createCanvas(previewArea, canvasName, zIndex) {
    let canvas = document.createElement('canvas')
    canvas.setAttribute('height', '500')
    canvas.setAttribute('width', '1280')
    canvas.setAttribute('id', canvasName)
    canvas.setAttribute('class', 'max-w-full py-4 absolute top-0 left-0')
    canvas.setAttribute('style', `z-index: ${zIndex}`)

    previewArea.append(canvas)
    this.canvasElement = document.getElementById(canvasName)
  }
}
