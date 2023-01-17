let svgText = 'Sky 201250044'
let fontSize = 20
let svgWidth = 250
let svgHeight = 250
let rotate = -45
let fillOpacity = 0.1
watermarksvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgWidth}px' height='${svgHeight}px'%3E  %3Ctext  x='${fontSize}' y='0'  fill-opacity='${fillOpacity}' fill='%23000' transform='translate(0,${svgHeight})rotate(${rotate})'    font-size='${fontSize}'%3E${svgText}%3C/text%3E%3C/svg%3E")`
document.querySelector('.watermark').style.setProperty('--watermarkSVG', watermarksvg)